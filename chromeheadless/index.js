const puppeteer = require('puppeteer');
const path = require('path')

;(async () => {
 const browser = await puppeteer.launch()
 const page = await browser.newPage()
 await page.goto('http://127.0.0.1:3000')
 await page.focus('.info .form-group:nth-child(2) .el-input input')
 await page.keyboard.type('15228798613')
 await page.focus('.info .form-group:nth-child(3) .el-input input')
 await page.keyboard.type('123456a')
 await page.click('.el-button')
 await page.waitForSelector('._change-container')
 await page.screenshot({path: path.resolve(__dirname, './example.png')})
 await browser.close()
})();