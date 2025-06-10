import { test, expect } from '@playwright/test';

test.only('Browser context Playwright test', async ({browser}) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#username');
    const signIn = page.locator("#signInBtn");
    const cardTitles = page.locator(".card-body a");
 
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());

    // css      type, fill
    // 現在不要用type
    await page.locator("#username").type("rahulshetty");
    await page.locator("[type='password']").type("learning");
    await signIn.click();

    // wait until this locatpe shown up page
    // webdriverwait
    // textContent(): fetch這個locator的text content這個locator的text content
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');

    await userName.fill("");    // erase content
    await userName.fill("rahulshettyacademy");
    await signIn.click();
    // console.log(await cardTitles.first().textContent());
    // wait first content出現，並非await signIn.click();就執行

    // console.log(await cardTitles.nth(1).textContent());
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);


});

test('Page Playwright test', async ({page}) => {

    await page.goto("https://google.com");
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");
    
});