// @ts-check
import { defineConfig, devices, expect } from '@playwright/test';

const config = ({
  testDir: './tests',
  timeout: 40*1000,
  expect: {
    timeout: 5000,
  },
  reporter: "html",

  use: {
    browserName: "webkit", //"firefox",//"chromium",
    headless: true,
    
  },

});
module.exports = config

