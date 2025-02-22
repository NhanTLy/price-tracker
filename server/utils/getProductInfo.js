const puppeteer = require('puppeteer');
/*
This file contains a function that webscrapes a google URL and outputs all the necessary info needed into an object including: 
productInfo Object = {
  lowest_daily_price,
  product_name,
  store_url,
  store_name,
  image_url
}
*/

const getProductInfo = async (url) => {
  const browser = await puppeteer.launch({
    args: ['--disabled-setuid-sandbox', '--no-sandbox'],
    // headless: false,
  });

  const page = await browser.newPage();
  await page.goto(url, {waitUntil: 'networkidle0'});

  const productInfo = {};

  //Checks if google url website exist?
  const pageNotFound = await page.evaluate(() => {
    return !!document.querySelector('.product-not-found');
  });
  if (pageNotFound) {
    console.log('True');
    await browser.close();
  } else {
    console.log('False');
  }

  // await page.waitForSelector('.g9WBQb');
  //1. Get lowestDailyPrice:
  try {
    productInfo.lowest_daily_price = await page.$eval(
      '.g9WBQb',
      (el) => el.innerHTML
    );
  } catch (err) {
    console.log('Puppeteer', err);
  }
  // .TZeISB
  //Convert to a number
  productInfo.lowest_daily_price = productInfo.lowest_daily_price.slice(1);

  // await page.waitForSelector('.BvQan');
  //2. Get productName:
  productInfo.product_name = await page.$eval('.BvQan', (el) => el.innerHTML);

  //3. Get storeUrl:
  const storeUrl = await page.$eval('a.shntl[href]', (el) =>
    el.getAttribute('href')
  );
  productInfo.store_url = `https://www.google.com/${storeUrl}`;

  // await page.waitForSelector('.b5ycib');
  //4. Get storeName:
  productInfo.store_name = await page.$eval(
    '.b5ycib',
    (el) => el.childNodes[0].nodeValue
  );

  //5. Get productImageUrl:
  productInfo.image_url = await page.$eval('img.sh-div__image[src]', (el) =>
    el.getAttribute('src')
  );

  // console.log("productInfo OBJECT: ", productInfo);

  await browser.close();

  return productInfo;
};

module.exports = getProductInfo;
