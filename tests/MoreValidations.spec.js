const { test, expect } = require('@playwright/test');

test('@Web Popup validations', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

    // await page.goto("http://google.com");
    // await page.goBack();
    // await page.goForward();

    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator('#hide-textbox').click();
    await expect(page.locator('#displayed-text')).toBeHidden();

    await page.pause();

    page.on('dialog', dialog => dialog.accept()); //dismiss()
    await page.locator('#confirmbtn').click();
    await page.locator('#mousehover').hover();

    // switch to iframe
    const framesPage = page.frameLocator('#courses-iframe');
    // i a[href*='lifetime-access']會得到兩個elememt，只需要visible那個
    await framesPage.locator("li a[href*='lifetime-access']:visible").click();
    const textCheck = await framesPage.locator('.text h2').textContent();
    console.log(textCheck.split(' ')[1]);
});

test('Screenshot & Visual comparision', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator('#displayed-text').screenshot({ path: 'partialScreenshot.png' });
    await page.locator('#hide-textbox').click();
    await page.screenshot({ path: 'screenshot.png' });
    await expect(page.locator('#displayed-text')).toBeHidden();
});

//screenshot -store -> screenshot ->
test.only('visual', async ({ page }) => {
    //make payment -when you 0 balance
    await page.goto('https://www.stdtime.gov.tw/home/WebClock');
    await page.waitForTimeout(3000);
    expect(await page.screenshot()).toMatchSnapshot('landing.png');
});
