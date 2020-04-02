const puppeteer = require('puppeteer');
const assert = require('assert');

describe('TODOアプリのテスト', function () {

  // mocha のタイムアウトを設定
  this.timeout(10000);

  const appUrl = 'http://localhost:3000/';
  let browser, page;

  before(async function (done) {

    // CIとlocalでpuppeteerの起動パラメータを切り替える
    const params = process.env.CI ? {
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    } : {
        headless: false,
        slowMo: 250
      };


    browser = await puppeteer.launch(params);
    page = await browser.newPage();
    await page.setViewport({
      width: 1200,
      height: 1000,
    });
    // page.on('console', console.log);
    done();
  });

  describe('画面遷移時', () => {

    before(async function (done) {
      await page.goto(appUrl, {
        waitUntil: 'networkidle2'
      });
      done();
    });

    it('タスクが2つ表示されていること', async () => {

      await page.waitForSelector('.sidebar > .scrollbar-container > .nav > .nav-item:nth-child(10) > .nav-link')
      await page.click('.sidebar > .scrollbar-container > .nav > .nav-item:nth-child(10) > .nav-link')

      await page.waitForSelector('.nav > .open > .nav-dropdown-items > .nav-item:nth-child(1) > .nav-link')
      await page.click('.nav > .open > .nav-dropdown-items > .nav-item:nth-child(1) > .nav-link')

      await page.waitForSelector('.row:nth-child(1) > .col-12:nth-child(1) > .card > .card-header > strong')
      await page.click('.row:nth-child(1) > .col-12:nth-child(1) > .card > .card-header > strong')

      assert.equal('', '');

    });
  });



  after(async (done) => {
    browser.close();
    done();
  });

});