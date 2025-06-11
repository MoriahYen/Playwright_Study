import { test, expect } from '@playwright/test';

test('Client App Login', async ({page}) => {

    const productName = 'ZARA COAT 3';
    const pruducts = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("moriah.yen@rawstone.com.tw");
    await page.locator("#userPassword").fill("Test1234");
    await page.locator("[value='Login']").click();
    // await page.waitForLoadState('networkidle');
    // .card-body a 會對應到多個elements，所以只會返回一個element
    await page.locator(".card-body b").first().waitFor();
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);

    const count = await pruducts.count();
    for (let i=0; i<count; i++) {
        // chaining locator, b is the son of ".card-body"
        if (await pruducts.nth(i).locator("b").textContent() === productName) {
            // add to cart
            await pruducts.nth(i).locator("text =  Add To Cart").click();
            break;
        }
            

    }
    
});