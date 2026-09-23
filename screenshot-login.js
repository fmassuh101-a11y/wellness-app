const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Set viewport size for desktop screenshot
  await page.setViewportSize({ width: 1280, height: 800 });

  // Navigate to the login page
  await page.goto('http://localhost:3000/login');

  // Wait for the page to load completely
  await page.waitForTimeout(2000);

  // Take screenshot
  await page.screenshot({
    path: 'login-screenshot.png',
    fullPage: true
  });

  console.log('Login screenshot saved as login-screenshot.png');

  await browser.close();
})();