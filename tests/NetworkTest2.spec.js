const { test, expect } = require('@playwright/test');

test('@QW Security test request intercept', async ({ page }) => {
    //login and reach orders page
    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator('#userEmail').fill('moriah.yen@rawstone.com.tw');
    await page.locator('#userPassword').fill('Test1234');
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    await page.locator('.card-body b').first().waitFor();

    await page.locator("button[routerlink*='myorders']").click();
    await page.route(
        'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*',
        route =>
            route.continue({
                url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6',
            }),
    );
    // 在user真的click view前，先mock一個假URL，防止URL直接被使用
    await page.locator("button:has-text('View')").first().click();
    // await page.pause();
    await expect(page.locator('p').last()).toHaveText('You are not authorize to view this order');
});
