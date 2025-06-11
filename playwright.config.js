// @ts-check
import { defineConfig, devices, expect } from '@playwright/test';
import { trace } from 'console';

const config = ({
  testDir: './tests',
  timeout: 30*1000,
  expect: {
    timeout: 5000,
  },
  repoter: 'html',

  use: {
    browserName: "chromium", //"webkit", //"firefox", //"chromium"
    headless: false,
    screenshot: 'on',
    trace: 'retain-on-failure', //'on',
    
  },

});
module.exports = config

