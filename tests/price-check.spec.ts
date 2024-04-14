import { test, expect } from '@playwright/test';

test('Check Price: monthly & annually', async ({ page }) => {
  await page.goto('https://www.disco.ac/pricing');
  await expect(page).toHaveTitle('DISCO | Pricing');

  // check Pay Monthly values
  var prices = await page.locator('[class="Price_Num heading--H5"]').all();
  expect(prices.length == 3);
  expect(prices[0]).toHaveText('$10');
  expect(prices[1]).toHaveText('$15');
  expect(prices[2]).toHaveText('$25');

  // switch to Pay Annually
  await page.locator('[class="Toggle"]').click();

  // check Pay Annually values
  prices = await page.locator('[class="Price_Num heading--H5"]').all();
  expect(prices.length == 3);
  expect(prices[0]).toHaveText('$9');
  expect(prices[1]).toHaveText('$13.50');
  expect(prices[2]).toHaveText('$22.50');
});