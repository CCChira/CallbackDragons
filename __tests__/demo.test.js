// Simple function to test the testing environment
const puppeteer = require('puppeteer');
const add = (a,b) => a + b

describe('testing unit test setup', () => {
  it('should work', () => {
    var sum = add(3,4)
    expect(sum).toBe(7)
  })
})

// Simple function testing puppeteer
describe('testing end-to-end setup', () => {
  beforeAll(async () => {
    browser = await puppeteer.launch({ 
      headless: false, 
      slowMo: 250, // slow down by 250ms 
    });
    page = await browser.newPage();
  });
  beforeEach(async () => {
    await page.goto('http://localhost:3000/search');
  })
  it('should go home', async () => {
    await page.waitForSelector('.MuiToolbar-root > div:nth-child(1) > a:nth-child(1)');
    await page.click('.MuiToolbar-root > div:nth-child(1) > a:nth-child(1)');
    await expect(page.url()).toMatch('http://localhost:3000');
  })
  it('should search', async () => {
    await page.waitForSelector('.MuiInputBase-input');
    await page.$eval('.MuiInputBase-input', el => el.value = 'HadaIonut');
    let element = await page.$('.MuiInputBase-input');
    element.press('Enter');
    }, 15000)
  it('should go to repo', async () => {
    await page.goto('http://localhost:3000/search/HadaIonut');
    await page.waitForSelector('div.MuiGrid-root:nth-child(1) > div:nth-child(1) > div:nth-child(2) > button:nth-child(1)');
    await page.click('div.MuiGrid-root:nth-child(1) > div:nth-child(1) > div:nth-child(2) > button:nth-child(1)');
    await page.waitForTimeout(5000);
    await expect(page.url()).toMatch('http://localhost:3000/search/HadaIonut/CallbackDragons');
  }, 100000)
  it('should enter a folder', async () => {
    await page.goto('http://localhost:3000/search/HadaIonut/CallbackDragons');
    await page.waitForTimeout(5000);
    await page.waitForSelector('div.MuiButtonBase-root:nth-child(2)');
    await page.click('div.MuiButtonBase-root:nth-child(2)');
    await page.waitForTimeout(5000);
    let element = await page.$('div.MuiButtonBase-root:nth-child(2)');
    let val = await page.evaluate(el => el.textContent, element);
    expect(val).toEqual('DropdownMenuComponent.js');
  }, 50000)
})
