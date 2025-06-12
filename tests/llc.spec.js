const { test, expect } = require('@playwright/test');

test('Play special locators', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    // playwright會搜尋整個zone(include"Check me out if you Love IceCreams!")
    // 直到找到click button
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");
    
});
