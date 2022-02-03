const XLSX = require('xlsx')
const fs = require('fs')
const prettier = require('prettier')
const yargs = require('yargs')

const ARGUMENTS_START_INDEX = 2
const argv = yargs(process.argv.slice(ARGUMENTS_START_INDEX)).argv

function storeData(data, path) {
  try {
    const stringifyedData = typeof data === 'string' ? data : JSON.stringify(data)
    fs.writeFileSync(path, stringifyedData)
  } catch (err) {
    console.error(err)
  }
}

function readFirstSheet(data, options) {
  const wb = XLSX.readFile(data, options)
  const ws = wb.Sheets[wb.SheetNames[0]]

  return XLSX.utils.sheet_to_json(ws, {header: 'A', raw: true, blankrows: false, defval: ''})
}

const data = readFirstSheet('./config/data.xlsx', {type: 'binary'})
const [headRow, ...restRows] = data

const {column = 'M', output = './config/data.json'} = argv

const header = {
  vendorCode: headRow.B,
  productName: headRow.D,
  // estimatedRetailPrice: headRow.F,
  photo: headRow.H,
  link: headRow[column],
}
const result = []

restRows.forEach((row) => {
  result.push({
    vendorCode: row.B,
    productName: row.D,
    // estimatedRetailPrice: row.F,
    photo: row.H,
    link: row[column],
  })
})

prettier.resolveConfig().then((options) => {
  const formatted = prettier.format(JSON.stringify([header, ...result]), {
    ...options,
    parser: 'json',
  })

  storeData(formatted, output)
})
