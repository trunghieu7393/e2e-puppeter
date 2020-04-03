const puppeteer = require('puppeteer');
const assert = require('assert');

describe('TODOアプリのテスト', function () {

  // mocha のタイムアウトを設定
  console.log("11-----------------")
  this.timeout(100000);
  console.log("222222-----------------")
  const appUrl = `http://localhost:3009/theme/typography`;
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
    // const width = 1200;
    // const height = 1000;
    // const params = {
    //   headless: false,
    //   slowMo: 250,
    //   args: ['--no-sandbox', '--disable-setuid-sandbox'],
    //   // args: [
    //   //   `--window-size=${width},${height}`
    //   // ],
    // }
    console.log("33333+++++++++-----------------")
    browser = await puppeteer.launch(params);
    page = await browser.newPage();
    // await page.setViewport({ width: width, height: height })

    // page.emulate({
    //   viewport: {
    //     width: 1200,
    //     height: 2000
    //   },
    //   userAgent: ''
    // });
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
        waitUntil: 'networkidle0'
      });
      done();
    });
    console.log("55555-----------------")

    it('タスクが2つ表示されていること', async () => {
      console.log("6666666-----------------")
      await page.waitForSelector('#root > .app > .app-header > .d-lg-none > .navbar-toggler-icon')
      console.log("6666666-----------------1")
      await page.click('#root > .app > .app-header > .d-lg-none > .navbar-toggler-icon')
      console.log("6666666-----------------2")

      await page.waitForSelector('.sidebar > .scrollbar-container > .nav > .nav-item:nth-child(3) > .nav-link')
      console.log("6666666-----------------3")
      await page.click('.sidebar > .scrollbar-container > .nav > .nav-item:nth-child(3) > .nav-link')
      console.log("6666666-----------------4")

      await page.waitForSelector('.card:nth-child(1) > .card-body > .row > .mb-4:nth-child(1) > h6')
      console.log("6666666-----------------5")
      await page.click('.card:nth-child(1) > .card-body > .row > .mb-4:nth-child(1) > h6')
      console.log("6666666-----------------6")
      const tweets = await page.$$('.card:nth-child(1) > .card-body > .row > .mb-4:nth-child(1) > h6');
      for (let i = 0; i < tweets.length; i++) {
        console.log("6666666-----------------7")
        const tweet = await (await tweets[i].getProperty('innerText')).jsonValue();
        console.log(tweet);
        assert.equal(tweet, 'Brand Primary Color');
      }
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