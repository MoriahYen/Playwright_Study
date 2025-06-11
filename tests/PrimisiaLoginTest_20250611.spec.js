const { test, expect } = require('@playwright/test');

test('Primisia Login Test', async ({ browser }) => {
  const context = await browser.newContext({
    ignoreHTTPSErrors: true
  });
  const page = await context.newPage();

  // 開啟登入頁
  await page.goto('https://202.39.156.175/cms/client/auth/login');

  // 選擇身分選項
  await page.getByRole('combobox').selectOption('0: Object');

  // 輸入帳號與密碼
  await page.getByRole('textbox', { name: '員工帳號:' }).fill('admin');
  await page.getByRole('textbox', { name: '密碼:' }).fill('admin');

  // 點擊登入
  await page.getByRole('button', { name: '登入' }).click();

  // ✅（可選）驗證登入成功畫面（建議補上斷言）
  // await expect(page).toHaveURL(/.*dashboard/);
  // await expect(page.locator('text=歡迎')).toBeVisible();

  await context.close();
});



// const { chromium } = require('playwright');

// (async () => {
//   const browser = await chromium.launch({
//     headless: false
//   });
//   const context = await browser.newContext({
//     ignoreHTTPSErrors: true
//   });
//   const page = await context.newPage();
//   await page.goto('https://202.39.156.175/cms/client/auth/login');
//   await page.getByRole('combobox').selectOption('0: Object');
//   await page.getByRole('textbox', { name: '員工帳號:' }).click();
//   await page.getByRole('textbox', { name: '員工帳號:' }).fill('admin');
//   await page.getByRole('textbox', { name: '員工帳號:' }).press('Tab');
//   await page.getByRole('textbox', { name: '密碼:' }).fill('admin');
//   await page.getByRole('button', { name: '登入' }).click();

//   // ---------------------
//   await context.close();
//   await browser.close();
// })();