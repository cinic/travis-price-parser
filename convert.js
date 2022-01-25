const XLSX = require('xlsx')
const fs = require('fs')
const prettier = require('prettier')

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

const header = {
  vendorCode: headRow.A,
  productCode: headRow.B,
  productName: headRow.D,
  // estimatedRetailPrice: headRow.F,
  photo: headRow.H,
  link: headRow.N,
}
const result = []

restRows.forEach((row) => {
  if (row.N !== '') {
    result.push({
      vendorCode: row.A,
      productCode: row.B,
      productName: row.D,
      // estimatedRetailPrice: row.F,
      photo: row.H,
      link: row.N,
    })
  }
})

prettier.resolveConfig().then((options) => {
  const formatted = prettier.format(JSON.stringify([header, ...result]), {
    ...options,
    parser: 'json',
  })

  storeData(formatted, './config/data.json')
})
