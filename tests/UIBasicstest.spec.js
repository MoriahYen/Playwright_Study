const {test, expect} = require('@playwright/test')

test.only('Browser context Playwright test', async ({browser}) => {

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

    // webdriverwait
    // textContent(): fetch這個locator的text content這個locator的text content
    console.log(await page.locator("[stylt*='block']").textContent());
    await expect(page.locator("[stylt*='block']")).toContainText('Incrrect');
    
});

test('Page Playwright test', async ({page}) => {

    await page.goto("https://google.com");
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");
    
});