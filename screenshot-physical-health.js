const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Set viewport size for desktop screenshot
  await page.setViewportSize({ width: 1280, height: 800 });

  // Navigate to the physical health page
  await page.goto('http://localhost:3000/physical-health');

  // Wait for the page to load completely
  await page.waitForTimeout(3000);

  // Take screenshot
  await page.screenshot({
    path: 'physical-health-screenshot.png',
    fullPage: true
  });

  console.log('Physical health page screenshot saved as physical-health-screenshot.png');

  await browser.close();
})();