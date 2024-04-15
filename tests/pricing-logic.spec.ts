import { test, expect } from '@playwright/test';

  var liteBasePrice = 10;
  var plusBasePrice = 15;
  var proBasePrice = 25;
  var filePrice = 6;
  var annualDiscount = 0.1

test.beforeEach(async ( {page} ) => {
  await page.goto('https://www.disco.ac/pricing');
  await expect(page).toHaveTitle('DISCO | Pricing');
  
  // Click Accept cookies to remove modal
  const acceptButton = await page.getByRole('button', { name: 'Accept all Cookies' }).click();
});

test('Check Base Prices: monthly & annually', async ({ page }) => {
  // check Pay Monthly values
  var prices = await page.locator('[class="Price_Num heading--H5"]').all();
  expect(prices.length).toEqual(3);
  expect(prices[0]).toHaveText(`$${ liteBasePrice }`);
  expect(prices[1]).toHaveText(`$${ plusBasePrice }`);
  expect(prices[2]).toHaveText(`$${ proBasePrice }`);

  await Promise.all([
    // switch to Pay Annually
    await page.locator('[class="Toggle"]').click(),

    // verify BasePrices are cheaper as per annual discount
    expect(prices[0]).toHaveText(`$${ liteBasePrice * (1 - annualDiscount) }`),
    expect(prices[1]).toHaveText(`$${ plusBasePrice * (1 - annualDiscount) }0`),
    expect(prices[2]).toHaveText(`$${ proBasePrice * (1 - annualDiscount) }0`)
  ]);
});

test('Check Plus Plan User Prices', async ({ page }) => {
  // Check Base price
  var prices = await page.locator('[class="Price_Num heading--H5"]').all();
  expect(prices.length).toEqual(3);
  expect(prices[1]).toHaveText(`$${ plusBasePrice }`);

  // Move User slider and check Plus plan price value has changed correctly
  var users = 1;
  const sliders = await page.locator('[class="rc-slider rc-slider-horizontal"]').all();
  expect(sliders.length).toEqual(4);
  const plusSlider = await sliders[0].boundingBox();
  if (!plusSlider) {
    throw new Error('Unable to find bounding box on element');
  }

  var x = plusSlider!.x;
  for(let i=1; i<9; i++) {
    x = x + 61;
    await Promise.all([
      await page.mouse.click(
        x, 
        plusSlider!.y
      ),
      users++,
      console.log(`Expected price: ${ plusBasePrice * users }`),
      expect(prices[1]).toHaveText(`$${ plusBasePrice * users }`)
    ]);
  }

  // Check maximum price
  users++;
  await Promise.all([
    await page.mouse.click(
      plusSlider!.x + plusSlider!.width - 5, 
      plusSlider!.y
    ),
    console.log(`Expected price: ${ plusBasePrice * users }`),
    expect(prices[1]).toHaveText(`$${ plusBasePrice * users }`)
  ]);
});

test('Check Plus Plan File Prices', async ({ page }) => {
  // Check Base price
  var prices = await page.locator('[class="Price_Num heading--H5"]').all();
  expect(prices.length).toEqual(3);
  expect(prices[1]).toHaveText(`$${ plusBasePrice }`);

  // Move Files slider and check Plus plan price value has changed correctly
  var files = 0;
  const sliders = await page.locator('[class="rc-slider rc-slider-horizontal"]').all();
  expect(sliders.length).toEqual(4);
  const fileSliderBox = await sliders[1].boundingBox();
  if (!fileSliderBox) {
    throw new Error('Unable to find bounding box on element');
  }
  

  var x = fileSliderBox!.x;
  for(let i=0; i<9; i++) {
    x = x + 27;
    await Promise.all([
      await page.mouse.click(x, fileSliderBox!.y),
      files++,
      console.log(`Expected price: ${ plusBasePrice + files * filePrice}`),
      expect(prices[1]).toHaveText(`$${ plusBasePrice + files * filePrice }`)
    ]);
  }

  // Handle 10K tracks case
  files = 14;
  await Promise.all([
    await page.mouse.click(
      x + 27, 
      fileSliderBox!.y
    ),
    console.log(`Expected price: ${ plusBasePrice + files * filePrice}`),
    expect(prices[1]).toHaveText(`$${ plusBasePrice + files * filePrice }`)
  ]);

  // Handle 20K tracks case
  files = 19;
  await Promise.all([
    await page.mouse.click(
      fileSliderBox!.x + fileSliderBox!.width - 5, 
      fileSliderBox!.y
    ),
    console.log(`Expected price: ${ plusBasePrice + files * filePrice}`),
    expect(prices[1]).toHaveText(`$${ plusBasePrice + files * filePrice }`)
  ]);
});