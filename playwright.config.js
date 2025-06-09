// @ts-check
import { defineConfig, devices, expect } from '@playwright/test';

const config = ({
  testDir: './tests',
  timeout: 40*1000;
  expect: {
    timeout: 40*1000,
  },
  reporter: "html",

  use: {
    browserName: "chromium",
    
  },

});
module.exports = config

