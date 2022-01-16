import { useState, useEffect, useRef } from 'react'

// import { Table } from 'antd';
import VirtualTable from './VirtualTable'

import useColumns from './useColumns'

import './index.less'

type calcTableProps = {
  options: { label: string; value: string }[]
  disabled: boolean
}

const validateFields = ['age', 'name', 'date', 'userName', 'customerName']

const CalcTable = (props: calcTableProps) => {
  const { options, disabled } = props
  const [data, setData] = useState([])
  const dataRef = useRef(data)

  useEffect(() => {
    const tableData = []
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 1000; i++) {
      tableData.push({
        key: i,
        name: i % 2 ? 'John Brown' : 'Picker',
        age: i + 1,
        street: 'Lake Park',
        Address: 'WeWork',
        building: 'C',
        date: '2022-12-12',
        number: 2035,
        companyAddress: 'Lake Street 42',
        companyName: 'SoftLake Co',
        gender: 'M',
      })
    }
    setData(tableData)
  }, [])

  useEffect(() => {
    dataRef.current = data
  }, [data])

  const updateToData = (index, key) => (value) => {
    const newData = [...dataRef.current]
    newData[index][key] = value
    if (validateFields.includes(key)) {
      // remove warning, when change value
      newData[index][`${key}Warning`] = undefined
    }
    setData(newData)
  }

  const handldWithCopy = (index) => () => {
    const newData = [...dataRef.current]

    const preSetData = {}
    const copiedRow = newData[index]
    let canCopy = true

    validateFields.forEach((field: string) => {
      const temp = copiedRow[field]
      preSetData[field] = temp
      if ([undefined, null, ''].includes(temp)) {
        copiedRow[`${field}Warning`] = true
        canCopy = false
      }
    })

    if (canCopy) {
      newData.splice(index + 1, 0, preSetData)
    } else {
      newData.splice(index, 1, copiedRow)
    }

    setData(newData)
  }

  const handldWithDelete = (index) => () => {
    const newData = [...dataRef.current]
    newData.splice(index, 1)
    setData(newData)
  }

  const [columns, setColumns] = useColumns(
    updateToData,
    handldWithCopy,
    handldWithDelete,
    options
  )

  useEffect(() => {
    setColumns(options)
  }, [options, disabled])

  return (
    <div className="tableContainer">
      <div
        className="mark"
        style={{
          zIndex: (disabled && 3) || -1,
          marginTop: 24,
        }}
      />
      <VirtualTable
        columns={columns}
        dataSource={data}
        scroll={{ x: '100%', y: 1000 }}
      />
    </div>
  )
}

export default CalcTable
