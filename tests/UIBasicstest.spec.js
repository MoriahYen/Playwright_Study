const {test, expect} = require('@playwright/test')

test('Browser context Playwright test', async ({browser}) => {

    const context = await browser.newContext();
    const poge = await context.newPage();
    // 暫時找不到可以測試的網頁
    await page.goto("https://playwright.dev/docs/test-timeouts");
    console.log(await page.title());

    // css      type, fill
    // 現在不要用type
    await page.locator('#username').fill("Yo");
    await page.locator("[type='password']").fill("Yo!!");
    await page.locator("#signInBtn").click();
    
});

test.only('Page Playwright test', async ({page}) => {

    await page.goto("https://google.com");
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");
    
});