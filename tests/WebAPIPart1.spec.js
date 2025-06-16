const { test, expect, request } = require('@playwright/test');
const loginPayLoad = { userEmail: 'moriah.yen@rawstone.com.tw', userPassword: 'Test1234' };

test.beforeAll(async () => {
    // behavior類似 const context = await browser.newContext();
    const apiContext = await request.newContext();
    const loginResponse = apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', {
        data: loginPayLoad,
    });

    expect((await loginResponse).ok()).toBeTruthy();
    const loginResponseJson = (await loginResponse).json();
    const token = loginResponseJson.token();
});

//create order is success
test('@API Place the order', async ({ page }) => {});
