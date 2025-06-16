const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('../utils/APIUtils');
const loginPayLoad = { userEmail: 'moriah.yen@rawstone.com.tw', userPassword: 'Test1234' };
const orderPayLoad = {
    orders: [{ country: 'Bahrain', productOrderedId: '67a8df1ac0d3e6622a297ccb' }],
};

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
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator('tbody').waitFor({ state: 'visible' });
    const rows = await page.locator('tbody tr');

    for (let i = 0; i < (await rows.count()); ++i) {
        const rowOrderId = await rows.nth(i).locator('th').textContent();
        if (response.orderId.includes(rowOrderId)) {
            await rows.nth(i).locator('button').first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator('.col-text').textContent();
    await page.pause();
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
});
