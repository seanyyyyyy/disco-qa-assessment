import { test, expect } from '@playwright/test';

test.beforeEach(async ( {page} ) => {
  console.log(`Running ${test.info().title}`);
  await page.goto('https://www.disco.ac/pricing');
  await expect(page).toHaveTitle('DISCO | Pricing');
});

test('Pay Annually > Move Sliders > Get Started', async ({ page }) => {
  // Click Accept cookies to remove modal
  const acceptButton = await page.getByRole('button', { name: 'Accept all Cookies' }).click();

  // Click Pay annually toggle button and check the prices have changed correctly
  await page.locator('[class="Toggle"]').click();
  const prices = await page.locator('[class="Price_Num heading--H5"]').all();
  expect(prices.length).toEqual(3);
  expect(prices[0]).toHaveText('$9');
  expect(prices[1]).toHaveText('$13.50');
  expect(prices[2]).toHaveText('$22.50');

  // Move Plus plan slider and check Plus plan price value has changed correctly
  const sliders = await page.locator('[class="rc-slider rc-slider-horizontal"]').all();
  expect(sliders.length).toEqual(4);
  const slider1box = await sliders[0].boundingBox();
  await page.mouse.click(
    slider1box!.x + slider1box!.width / 2, 
    slider1box!.y + slider1box!.height / 2
  );
  expect(prices[0]).toHaveText('$9');
  expect(prices[1]).toHaveText('$81');
  expect(prices[2]).toHaveText('$22.50');

  // Click Get started and check correct page
  const getStartedLinks = await page.getByRole('link', { name: 'Get started' }).all();
  expect(getStartedLinks.length).toEqual(4);
  await getStartedLinks[1].click();
  await expect(page).toHaveTitle('DISCO | Sign up');
});

test('Review full features > Tooltips > Get In Touch', async ({ page }) => {
  //TODO
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