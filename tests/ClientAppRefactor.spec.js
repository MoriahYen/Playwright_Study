import { test, expect } from '@playwright/test';

test('Client App Login', async ({ page }) => {
    const email = 'moriah.yen@rawstone.com.tw';
    const productName = 'ZARA COAT 3';
    const pruducts = page.locator('.card-body');
    await page.goto('https://rahulshettyacademy.com/client');
    await page.getByPlaceholder('email@example.com').fill(email);
    await page.getByPlaceholder('enter your passsword').fill('Test1234');
    await page.getByRole('button', { name: 'login' }).click();
    // await page.waitForLoadState('networkidle');
    // .card-body a 會對應到多個elements，所以只會返回一個element
    await page.locator('.card-body b').first().waitFor();

    await page
        .locator('.card-body')
        .filter({ hasText: 'ZARA COAT 3' })
        .getByRole('button', { name: 'Add To Cart' })
        .click();
    // const count = await pruducts.count();
    // for (let i = 0; i < count; i++) {
    //     // chaining locator, b is the son of ".card-body"
    //     if ((await pruducts.nth(i).locator('b').textContent()) === productName) {
    //         // add to cart
    //         await pruducts.nth(i).locator('text =  Add To Cart').click();
    //         break;
    //     }
    // }

    // 從parent "li" 來識別
    await page.getByRole('listitem').getByRole('button', { name: 'Cart' }).click();
    // wait cart裡有框框出現，只等第一個element出現就好
    await page.locator('div li').first().waitFor();
    await expect(page.getByText('ZARA COAT 3')).toBeVisible();

    await page.getByRole('button', { name: 'Checkout' }).click();
    await page.getByPlaceholder('Select Country').pressSequentially('ind');

    await page.getByRole('button', { name: 'India' }).nth(1).click();
    await page.getByText('PLACE ORDER').click();
    await expect(page.getByText('Thankyou for the order.')).toBeVisible();
});
