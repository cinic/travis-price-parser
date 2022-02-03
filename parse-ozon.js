const fetch = require('node-fetch')
const cheerio = require('cheerio')
const fs = require('fs')
const prettier = require('prettier')
const jsonData = require('./config/data-ozon.json')

const [_header, ...data] = jsonData
const header = {
  ..._header,
  title: 'Наименование',
  price: 'Цена',
  balance: 'Остаток на складе',
  rating: 'Рейтинг',
  reviews: 'Отзывы',
}

getData(data).then((res) => {
  prettier.resolveConfig().then((options) => {
    const formatted = prettier.format(JSON.stringify([header, ...res]), {
      ...options,
      parser: 'json',
    })
    storeData(formatted, './config/parsed-ozon.json')
  })
})

function storeData(data, path) {
  try {
    const stringifyedData = typeof data === 'string' ? data : JSON.stringify(data)
    fs.writeFileSync(path, stringifyedData)
  } catch (err) {
    console.error(err)
  }
}

async function getData(data, result = []) {
  const row = data[10]
  console.log(row)
  const headers = new fetch.Headers({
    'Content-Type': 'text/html',
    Accept: '*/*',
    'Accept-Encoding': 'gzip, deflate, br',
    Cookie:
      '__Secure-ab-group=58; __Secure-user-id=27546; AREA_ID=5911; xcid=4573081e15dc2a6c479f71cbd4daef3f',
    Connection: 'keep-alive',
    Host: 'www.ozon.ru',
    'Postman-Token': '470a88ba-5a08-46cf-9088-3da5283b1168',
    'User-Agent':
      'Mozilla/5.0 (X11; Linux x86_64; Storebot-Google/1.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Safari/537.36',
  })
  // for (const row of data) {
  //   if (row.link.startsWith('http')) {
  const response = await fetch(row.link, {headers, follow: true})
  // const body = await response.text()
  console.log('headers', response.headers)
  const body = await response.text()
  const $ = cheerio.load(body)

  const price = $('div[data-widget=webPrice]').html()
  //     const title = $('h1.title').html()
  //     const balance = $('.product-delivery > li strong:last-child').html()
  //     const rating = $('.reviews-info .total-rating .total-number').text()
  //     const reviews = $('.reviews-info .total-rating .total-stars a').text()
  console.log(price, $.root().html())
  //     result.push({...row, title, price, balance, rating, reviews})
  //   } else {
  //     result.push({...row, title: null, price: null, balance: null, rating: null, reviews: null})
  //   }
  // }

  return result
}
