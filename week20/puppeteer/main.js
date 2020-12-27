const puppeter = require('puppeter')

(async () => {
  const browser = await puppeter.launch()
  const page = await browser.newPage()
  // await page.goto('https://example.com')
  await page.goto('https://localhost:8080/main.html')
  // const a = await page.$('a')
  // console.log(await a.asElement().boxModel())
  const imgs = await page.$$('a')
  console.log(imgs)
  
})()

