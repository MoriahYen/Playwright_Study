import { test, expect } from '@playwright/test';

test.only('Browser context Playwright test', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    // block css, stop the call to reach the browser
    // page.route('**/*.{jpg,png,jepg}', route => route.abort());

    const userName = page.locator('#username');
    const signIn = page.locator('#signInBtn');
    const cardTitles = page.locator('.card-body a');

    page.on('request', request => console.log(request.url()));
    page.on('response', response => console.log(response.url(), response.status()));
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());

    // css      type, fill
    // 現在不要用type
    await userName.fill('rahulshetty');
    await page.locator("[type='password']").fill('learning');
    await signIn.click();

    // wait until this locatpe shown up page
    // webdriverwait
    // textContent(): fetch這個locator的text content
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');

    await userName.fill(''); // erase content
    await userName.fill('rahulshettyacademy');
    await signIn.click();
    // console.log(await cardTitles.first().textContent());
    // wait first content出現，並非await signIn.click();就執行

    // console.log(await cardTitles.nth(1).textContent());
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);
});

test('Page Playwright test', async ({ page }) => {
    await page.goto('https://google.com');
    console.log(await page.title());
    await expect(page).toHaveTitle('Google');
});

test('@Web UI control', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const userName = page.locator('#username');
    const signIn = page.locator('#signInBtn');
    const documentLink = page.locator("[href*='documents-request']");
    const dropdown = page.locator('select.form-control');
    await dropdown.selectOption('consult');
    await page.locator('.radiotextsty').last().click();
    await page.locator('#okayBtn').click();
    console.log(await page.locator('.radiotextsty').last().isChecked());
    await expect(page.locator('.radiotextsty').last()).toBeChecked();
    await page.locator('#terms').click();
    await expect(page.locator('#terms')).toBeChecked();
    await page.locator('#terms').uncheck();
    expect(await page.locator('#terms').isChecked()).toBeFalsy();
    await expect(documentLink).toHaveAttribute('class', 'blinkingText');
});

test('@Child windows hadle', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#username');
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const documentLink = page.locator("[href*='documents-request']");

    // Promise.all: whenever you think a set of steps needs to be parallelly,
    // go and wait until these steps are succelly accomplished
    const [newPage] = await Promise.all([
        // 以下兩行應同時進行
        context.waitForEvent('page'), //listen for any new page pending,rejected,fulfilled
        documentLink.click(),
    ]); //new page is opened

    const text = await newPage.locator('.red').textContent();
    console.log(text);
    const arrayText = text.split('@');
    const domain = arrayText[1].split(' ')[0];
    console.log(domain);
    await page.locator('#username').fill(domain);
    console.log(await page.locator('#username').textContent());
});
