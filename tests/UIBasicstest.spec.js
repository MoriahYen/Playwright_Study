const {test} = require('@playwright/test')

test('Browser context Playwright test', async ({browser}) => {

    const context = await browser.newContext();
    const poge = await context.newPage();
    await page.goto("https://playwright.dev/docs/test-timeouts");
    
});

test('Page Playwright test', async ({page}) => {

    await page.goto("https://google.com");
    
});