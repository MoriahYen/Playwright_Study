const { test, expect, request } = require('@playwright/test');
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
    const loginResponse = await apiContext.post(
        'https://rahulshettyacademy.com/api/ecom/auth/login',
        {
            data: loginPayLoad,
        },
    );

    expect((await loginResponse).ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json();
    token = loginResponseJson.token;
    console.log('Token:', token);

    // 跳過一直點選直到order的步驟
    const orderResponse = await apiContext.post(
        'https://rahulshettyacademy.com/api/ecom/order/create-order',
        {
            data: orderPayLoad,
            headers: {
                Authorization: token,
                'content-type': 'application/json',
            },
        },
    );
    const orderResponseJson = await orderResponse.json();
    orderId = orderResponseJson.orders[0];
});

test('Place the order', async ({ page }) => {
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
