import { useState, useCallback, useEffect, useMemo } from 'react';

import { Button } from 'antd';

import HeaderCell from './Cell/HeaderCell';
import AutoCell from './Cell';

const usernameOp = [
  { label: 'Picker', value: 'Picker' },
  { label: 'Christine', value: 'Christine' },
];

const useColumns = (updateToData, handldWithCopy, handldWithDelete, options) => {
  const [columns, setColumns] = useState([]);
  const unOp = useMemo(() => usernameOp, [usernameOp]);
  const updateColumns = (dropdownOptions?: { label: string; value: string }[]) => {
    const columnsInit = [
      {
        title: '租期内价值',
        children: [
          {
            title: '#',
            dataIndex: 'index',
            key: 'index',
            width: 50,
            render: (text, record, index) => index + 1,
          },
          {
            title: <HeaderCell label="name" tooltipText="this is user name" />,
            dataIndex: 'name',
            key: 'name',
            width: 150,
            filters: [
              {
                text: 'Picker',
                value: 'Picker',
              },
              {
                text: 'John',
                value: 'John',
              },
            ],
            onFilter: (value, record) => record.name.includes(value),
            render: (text, record, index) => (
              <AutoCell
                value={text}
                type="text"
                disabled={record.nameDisable}
                warning={record.nameWarning}
                updateToData={useCallback(updateToData(index, 'name'), [index])}
              />
            ),
          },
          {
            title: <HeaderCell label="age" text="选填" />,
            dataIndex: 'age',
            key: 'age',
            width: 150,
            sorter: (a, b) => a.age - b.age,
            render: (text, record, index) => (
              <AutoCell
                type="number"
                value={text}
                disabled={record.ageDisable}
                warning={record.ageWarning}
                updateToData={useCallback(updateToData(index, 'age'), [index])}
              />
            ),
          },
          {
            title: 'Address',
            dataIndex: 'Address',
            key: 'Address',
            width: 150,
            render: (text, record, index) => (
              <AutoCell
                type="text"
                value={text}
                disabled={record.AddressDisable}
                warning={record.AddressWarning}
                updateToData={useCallback(updateToData(index, 'Address'), [index])}
              />
            ),
          },
          {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            width: 150,
            render: (text, record, index) => (
              <AutoCell
                type="date"
                value={text}
                disabled={record.dateDisable}
                warning={record.dateWarning}
                updateToData={useCallback(updateToData(index, 'date'), [index])}
              />
            ),
          },
          {
            title: 'User Name',
            dataIndex: 'userName',
            key: 'userName',
            width: 150,
            render: (text, record, index) => (
              <AutoCell
                type="select"
                value={text}
                options={unOp}
                disabled={record.userNameDisable}
                warning={record.userNameWarning}
                updateToData={useCallback(updateToData(index, 'userName'), [index])}
              />
            ),
          },
          {
            title: 'Customer Name',
            dataIndex: 'customerName',
            key: 'customerName',
            width: 150,
            render: (text, record, index) => (
              <AutoCell
                type="select"
                value={text}
                options={dropdownOptions}
                disabled={record.customerNameDisable}
                warning={record.customerNameWarning}
                updateToData={useCallback(updateToData(index, 'customerName'), [index])}
              />
            ),
          },
        ],
      },
      {
        title: '还原价值',
        children: [
          {
            title: 'Company Name',
            dataIndex: 'companyName',
            key: 'companyName',
            width: 800,
          },
          {
            title: 'Company Address',
            dataIndex: 'companyAddress',
            key: 'companyAddress',
            width: 400,
          },
          {
            title: 'Company Name',
            dataIndex: 'companyName',
            key: 'companyName',
            width: 400,
          },
          {
            title: 'Company Address',
            dataIndex: 'companyAddress',
            key: 'companyAddress',
            width: 400,
          },
          {
            title: 'Company Name',
            dataIndex: 'companyName',
            key: 'companyName',
            width: 400,
          },
        ],
      },
      {
        title: '市场价值',
        children: [
          {
            title: 'Company Address',
            dataIndex: 'companyAddress',
            key: 'companyAddress',
            width: 400,
          },
          {
            title: 'Company Name',
            dataIndex: 'companyName',
            key: 'companyName',
            width: 400,
          },
        ],
      },
      {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        width: 200,
        fixed: 'right',
        render: (text, record, index) => (
          <>
            <Button key="copy" onClick={handldWithCopy(index)}>
              复制
            </Button>
            <Button key="delete" onClick={handldWithDelete(index)}>
              删除
            </Button>
          </>
        ),
      },
    ];

    setColumns(columnsInit);
  };

  useEffect(() => {
    updateColumns(options);
  }, []);

  return [columns, updateColumns];
};

export default useColumns;
