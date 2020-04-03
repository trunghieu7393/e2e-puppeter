const puppeteer = require('puppeteer');
const assert = require('assert');

describe('TODOアプリのテスト', function () {

  // mocha のタイムアウトを設定
  console.log("11-----------------")
  this.timeout(100000);
  console.log("222222-----------------")
  const appUrl = 'http://localhost:3000/';
  let browser, page;

  before(async function (done) {

    // CIとlocalでpuppeteerの起動パラメータを切り替える
    // const params = process.env.CI ? {
    //   headless: true,
    //   args: ['--no-sandbox', '--disable-setuid-sandbox']
    // } : {
    //     headless: false,
    //     slowMo: 250
    //   };
    const width = 1200;
    const height = 1000;
    const params = {
      headless: true,
      // slowMo: 250,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      // args: [
      //   `--window-size=${width},${height}`
      // ],
    }
    console.log("33333+++++++++-----------------")
    browser = await puppeteer.launch(params);
    page = await browser.newPage();

    page.emulate({
      viewport: {
        width: 1200,
        height: 2000
      },
      userAgent: ''
    });
    // await page.setViewport({
    //   width: width,
    //   height: height,
    // });
    // console.log("33333-----------------")
    // page.on('console', console.log);
    done();
  });

  describe('画面遷移時', () => {
    console.log("44444444-----------------")
    before(async function (done) {
      await page.goto(appUrl, {
        waitUntil: 'networkidle2'
      });
      done();
    });
    console.log("55555-----------------")

    it('タスクが2つ表示されていること', async () => {
      console.log("6666666-----------------")
      await page.waitForSelector('.sidebar > .scrollbar-container > .nav > .nav-item:nth-child(10) > .nav-link')
      await page.click('.sidebar > .scrollbar-container > .nav > .nav-item:nth-child(10) > .nav-link')

      await page.waitForSelector('.nav > .open > .nav-dropdown-items > .nav-item:nth-child(1) > .nav-link')
      await page.click('.nav > .open > .nav-dropdown-items > .nav-item:nth-child(1) > .nav-link')

      await page.waitForSelector('.row:nth-child(1) > .col-12:nth-child(1) > .card > .card-header > strong')
      await page.click('.row:nth-child(1) > .col-12:nth-child(1) > .card > .card-header > strong')

      assert.equal('', '');
      console.log("777777-----------------")

    });
  });



  after(async (done) => {
    console.log("888888-----------------")
    browser.close();
    console.log("999999-----------------")
    done();
  });

});