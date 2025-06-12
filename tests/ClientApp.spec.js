import { test, expect } from '@playwright/test';

test('Client App Login', async ({ page }) => {
    const email = 'moriah.yen@rawstone.com.tw';
    const productName = 'ZARA COAT 3';
    const pruducts = page.locator('.card-body');
    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator('#userEmail').fill(email);
    await page.locator('#userPassword').fill('Test1234');
    await page.locator("[value='Login']").click();
    // await page.waitForLoadState('networkidle');
    // .card-body a 會對應到多個elements，所以只會返回一個element
    await page.locator('.card-body b').first().waitFor();
    const titles = await page.locator('.card-body b').allTextContents();
    console.log(titles);

    const count = await pruducts.count();
    for (let i = 0; i < count; i++) {
        // chaining locator, b is the son of ".card-body"
        if ((await pruducts.nth(i).locator('b').textContent()) === productName) {
            // add to cart
            await pruducts.nth(i).locator('text =  Add To Cart').click();
            break;
        }
    }

    await page.locator("[routerlink*='cart']").click();
    // wait cart裡有框框出現，只等第一個element出現就好
    await page.locator('div li').first().waitFor();
    // 用h3識別，才不會找別的'ZARA COAT 3'
    // isVisible()不屬於auto-wait
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();

    await page.locator('text=Checkout').click();
    // input的框框選字只有在typing的時候出現，直接paste不會
    await page.locator("[placeholder*='Country']").pressSequentially('ind');
    const dropdown = page.locator('.ta-results');
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator('button').count();
    for (let i = 0; i < optionsCount; ++i) {
        const text = await dropdown.locator('button').nth(i).textContent();
        if (text === ' India') {
            await dropdown.locator('button').nth(i).click();
            break;
        }
    }
    expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    await page.locator('.action__submit').click();
    await expect(page.locator('.hero-primary')).toHaveText(' Thankyou for the order. ');
    const orderId = await page.locator('.em-spacer-1 .ng-star-inserted').textContent();
    console.log(orderId);

    await page.locator("button[routerlink*='myorders']").click();
    await page.locator('tbody').waitFor();
    const rows = await page.locator('tbody tr');

    for (let i = 0; i < (await rows.count()); ++i) {
        const rowOrderId = await rows.nth(i).locator('th').textContent();
        if (orderId.includes(rowOrderId)) {
            await rows.nth(i).locator('button').first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator('.col-text').textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();
});
