const fetch = require('node-fetch')
const cheerio = require('cheerio')
const fs = require('fs')
const prettier = require('prettier')
const jsonData = require('./config/data-vi.json')

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
    storeData(formatted, './config/parsed-vi.json')
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
  for (const row of data) {
    if (row.link.startsWith('http')) {
      const response = await fetch(row.link)
      const body = await response.text()
      const $ = cheerio.load(body)

      const price = $('.product-price .current-price').html()
      const title = $('h1.title').html()
      const balance = $('.product-delivery > li strong:last-child').html()
      const rating = $('.reviews-info .total-rating .total-number').text()
      const reviews = $('.reviews-info .total-rating .total-stars a').text()

      console.log({...row, title, price, balance, rating, reviews})
      result.push({...row, title, price, balance, rating, reviews})
    } else {
      result.push({...row, title: null, price: null, balance: null, rating: null, reviews: null})
    }
  }

  return result
}
