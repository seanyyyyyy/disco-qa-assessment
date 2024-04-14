import { test, expect } from '@playwright/test';

test.beforeEach(async ( {page} ) => {
  console.log(`Running ${test.info().title}`);
  await page.goto('https://www.disco.ac/pricing');
  await expect(page).toHaveTitle('DISCO | Pricing');
});


test('User flow: Pay Annually > Move Slider', async ({ page }) => {
  await page.locator('[class="Toggle"]').click();

  const prices = await page.locator('[class="Price_Num heading--H5"]').all();
  expect(prices.length == 3);
  expect(await prices[0].textContent() == '$9');
  expect(await prices[1].textContent() == '$13.50');
  expect(await prices[2].textContent() == '$22.50');

  
});

test('User flow: view catalogs', async ({ page }) => {
  await page.getByRole('link', { name: 'Looking for DISCO Catalogs and Auto-tagging pricing?' }).click();
  await expect(page).toHaveTitle('DISCO | Catalogs');

  await expect(page.getByRole('heading', { name: 'Discovery Suite: Catalogs' })).toBeVisible();
});

test('User flow: view artist plan', async ({ page }) => {
  await page.goto('https://www.disco.ac/pricing');
  await expect(page).toHaveTitle('DISCO | Pricing');

  await page.getByRole('link', { name: 'Find out more' }).click();
  await expect(page).toHaveTitle('DISCO | Artist Plan Comparison');
});

test('screenshot', async ({ page }) => {
  await expect(page).toHaveScreenshot();
});