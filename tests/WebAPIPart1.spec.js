const { test, expect, request } = require('@playwright/test');
const loginPayLoad = { userEmail: 'moriah.yen@rawstone.com.tw', userPassword: 'Test1234' };

let token;

test.beforeAll(async () => {
    // behavior類似 const context = await browser.newContext();
    const apiContext = await request.newContext();
    const loginResponse = apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', {
        data: loginPayLoad,
    });

    expect((await loginResponse).ok()).toBeTruthy();
    const loginResponseJson = (await loginResponse).json();
    const token = loginResponseJson.token;
});

test('Place the order', async ({ page }) => {
    // 用API調用可以跳過用email login的部分
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);

    const email = '';
    const productName = 'ZARA COAT 3';
    await page.goto('https://rahulshettyacademy.com/client');
});
