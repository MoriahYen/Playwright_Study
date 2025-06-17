const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('../utils/APIUtils');
const loginPayLoad = { userEmail: 'moriah.yen@rawstone.com.tw', userPassword: 'Test1234' };
const orderPayLoad = {
    orders: [{ country: 'Bahrain', productOrderedId: '67a8df1ac0d3e6622a297ccb' }],
};
const fakePayLoadOrders = { data: [], message: 'No Orders' };

let response;

test.beforeAll(async () => {
    // Login API
    // behavior類似 const context = await browser.newContext();
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayLoad);
    response = await apiUtils.createOrder(orderPayLoad);
});

test('Place the order', async ({ page }) => {
    // 用API調用可以跳過用email login的部分
    await page.addInitScript(token => {
        window.localStorage.setItem('token', token);
    }, response.token);

    await page.goto('https://rahulshettyacademy.com/client');
    console.log('Current URL:', page.url());

    // 在真正click之前先mock
    await page.route(
        'https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*',
        async route => {
            const response = await page.request.fetch(route.request());
            let body = JSON.stringify(fakePayLoadOrders); // fake res
            route.fulfill({
                response,
                body, // fake body
            });
            //intercepting response -APi response-> { playwright fakeresponse}->browser->render data on front end
        },
    );

    // tell playwright to mock the orders call
    await page.locator("button[routerlink*='myorders']").click();
    // await page.pause();
    // 避免順序錯誤
    await page.waitForResponse(
        'https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*',
    );
    console.log(await page.locator('.mt-4').textContent());
});
