// @ts-check
import { defineConfig, devices, expect } from '@playwright/test';

const config = ({
  testDir: './tests',
  timeout: 30*1000,
  expect: {
    timeout: 5000,
  },
  reporter: "html",

  use: {
    browserName: "chromium", //"webkit", //"firefox", //"chromium"
    headless: false,
    
  },

});
module.exports = config

