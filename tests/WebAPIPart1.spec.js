const { test, expect, request } = require('@playwright/test');
const { ApiUtils } = require('../utils/APIUtils');
const loginPayLoad = { userEmail: 'moriah.yen@rawstone.com.tw', userPassword: 'Test1234' };
const orderPayLoad = {
    orders: [{ country: 'Bahrain', productOrderedId: '67a8df1ac0d3e6622a297ccb' }],
};

let orderId;
let token;

test.beforeAll(async () => {
    // Login API
    // behavior類似 const context = await browser.newContext();
    const apiContext = await request.newContext();
    const apiUtils = new ApiUtils(apiContext, loginPayLoad);
    apiUtils.createOrder(orderPayLoad);
});

test('Place the order', async ({ page }) => {
    const ApiUtils = new ApiUtils(apiContext, loginPayLoad);
    const orderId = createOrder(orderPayLoad);
    // 用API調用可以跳過用email login的部分
    await page.addInitScript(token => {
        window.localStorage.setItem('token', token);
    }, token);

    await page.goto('https://rahulshettyacademy.com/client');
    console.log('Current URL:', page.url());
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator('tbody').waitFor({ state: 'visible' });
    const rows = await page.locator('tbody tr');

    for (let i = 0; i < (await rows.count()); ++i) {
        const rowOrderId = await rows.nth(i).locator('th').textContent();
        if (orderId.includes(rowOrderId)) {
            await rows.nth(i).locator('button').first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator('.col-text').textContent();
    await page.pause();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();
});
