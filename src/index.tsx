import React from 'react'
import {render} from 'react-dom'
import {createStore} from 'effector'
import {useList, useStore} from 'effector-react'

import jsonData from '../config/parsed-vi.json'

import styles from './styles.module.css'

const [header, ...data] = jsonData
const $listHeader = createStore(header)
const $list = createStore(data)

render(<App />, document.getElementById('root'))

function App() {
  const list = useList($list, TableRow)

  return (
    <div className={styles.app}>
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
  const {productName, vendorCode, title, price, balance, rating, reviews} = useStore($listHeader)

  return (
    <tr>
      <th>{vendorCode}</th>
      <th>{productName}</th>
      <th>{title}</th>
      <th className={styles.price}>{price}</th>
      <th className={styles.balance}>{balance}</th>
      <th className={styles.rating}>{rating}</th>
      <th className={styles.reviews}>{reviews}</th>
    </tr>
  )
}

function TableRow(row: typeof $list.defaultState[number]) {
  const {productName, vendorCode, title, price, balance, rating, reviews, link} = row

  return (
    <tr>
      <td>{vendorCode}</td>
      <td>{productName}</td>
      <td>
        <a href={link}>{title}</a>
      </td>
      <td className={styles.price}>
        <ValueOrNa>{price}</ValueOrNa>
      </td>
      <td className={styles.balance}>
        <ValueOrNa>{balance}</ValueOrNa>
      </td>
      <td className={styles.rating}>
        <ValueOrNa>{rating}</ValueOrNa>
      </td>
      <td className={styles.reviews}>
        <ValueOrNa>{reviews}</ValueOrNa>
      </td>
    </tr>
  )
}

function ValueOrNa({children}) {
  return <>{children || 'N/A'}</>
}
