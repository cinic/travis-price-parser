import React from 'react'
import {render} from 'react-dom'
import {createStore} from 'effector'
import {useList, useStore} from 'effector-react'

// import {h, remap, using} from 'forest'
import jsonData from '../config/parsed-data.json'

const [header, ...data] = jsonData
const $listHeader = createStore(header)
const $list = createStore(data)

render(<App />, document.getElementById('root'))

function App() {
  const list = useList($list, TableRow)

  return (
    <div>
      <table>
        <thead>
          <HeadRow />
        </thead>
        <tbody>{list}</tbody>
      </table>
    </div>
  )
}

function HeadRow() {
  const {productCode, productName, vendorCode, title, price, balance, rating, reviews} =
    useStore($listHeader)

  return (
    <tr>
      <th>{vendorCode}</th>
      <th>{productCode}</th>
      <th>{productName}</th>
      <th>{title}</th>
      <th>{price}</th>
      <th>{balance}</th>
      <th>{rating}</th>
      <th>{reviews}</th>
    </tr>
  )
}

function TableRow(row: typeof $list.defaultState[number]) {
  const {productCode, productName, vendorCode, title, price, balance, rating, reviews, link} = row

  return (
    <tr>
      <td>{vendorCode}</td>
      <td>{productCode}</td>
      <td>{productName}</td>
      <td>
        <a href={link}>{title}</a>
      </td>
      <td>{price}</td>
      <td>{balance}</td>
      <td>{rating}</td>
      <td>{reviews}</td>
    </tr>
  )
}
