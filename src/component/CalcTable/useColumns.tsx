import { useState, useCallback, useEffect, useMemo } from 'react';

import { Button } from 'antd';

import HeaderCell from './Cell/HeaderCell';
import AutoCell from './Cell';

const useColumns = (updateToData, handldWithCopy, handldWithDelete, options) => {
  const [columns, setColumns] = useState([]);
  // const unOp = useMemo(() => usernameOp, [usernameOp]);
  const updateColumns = (dropdownOptions?: { label: string; value: string }[]) => {
    const columnsInit = [
      {
        title: 'section0',
        children: [
          {
            title: '#',
            dataIndex: 'index',
            key: 'index',
            width: 150,
            render: (text, record, index) => (
              <AutoCell
                value={text}
                type="number"
                updateToData={useCallback(updateToData(index, 'index'), [index])}
                controls={false}
                min={1}
              />
            ),
          },
          {
            title: 'tenantNo',
            dataIndex: 'tenantNo',
            key: 'tenantNo',
            width: 150,
            render: (text, record, index) => (
              <AutoCell value={text} type="text" updateToData={useCallback(updateToData(index, 'tenantNo'), [index])} />
            ),
          },
          {
            title: <HeaderCell label="phaseNo" tooltipText="前后填写方式须保持一致" />,
            dataIndex: 'phaseNo',
            key: 'phaseNo',
            width: 150,
            render: (text, record, index) => (
              <AutoCell
                type="text"
                value={text}
                disabled={record.phaseNoDisable}
                warning={record.phaseNoWarning}
                updateToData={useCallback(updateToData(index, 'phaseNo'), [index])}
              />
            ),
          },
          {
            title: <HeaderCell label="buildingNo" tooltipText="前后填写方式须保持一致" />,
            dataIndex: 'buildingNo',
            key: 'buildingNo',
            width: 150,
            render: (text, record, index) => (
              <AutoCell
                type="text"
                value={text}
                disabled={record.buildingNoDisable}
                warning={record.buildingNoWarning}
                updateToData={useCallback(updateToData(index, 'buildingNo'), [index])}
              />
            ),
          },
          {
            title: <HeaderCell label="floorNo" tooltipText="前后填写方式须保持一致" />,
            dataIndex: 'floorNo',
            key: 'floorNo',
            width: 150,
            render: (text, record, index) => (
              <AutoCell
                type="text"
                value={text}
                disabled={record.floorNoDisable}
                warning={record.floorNoWarning}
                updateToData={useCallback(updateToData(index, 'floorNo'), [index])}
              />
            ),
          },
          {
            title: 'status',
            dataIndex: 'status',
            key: 'status',
            width: 150,
            filters: [
              { value: 1, text: '空置' },
              { value: 2, text: '出租' },
              { value: 3, text: '到期' },
            ],
            onFilter: (value, record) => record.status.includes(value),
            render: (text, record, index) => (
              <AutoCell
                type="select"
                value={text}
                options={[
                  { value: 1, label: '空置' },
                  { value: 2, label: '出租' },
                  { value: 3, label: '到期' },
                ]}
                disabled={record.statusDisable}
                warning={record.statusWarning}
                updateToData={useCallback(updateToData(index, 'status'), [index])}
              />
            ),
          },
          {
            title: 'alternatives',
            dataIndex: 'alternatives',
            key: 'alternatives',
            width: 150,
            render: (text, record, index) => (
              <AutoCell
                type="text"
                value={text}
                updateToData={useCallback(updateToData(index, 'alternatives'), [index])}
              />
            ),
          },
          {
            title: 'propertyType',
            dataIndex: 'propertyType',
            key: 'propertyType',
            width: 150,
            filters: [
              { value: 1, text: '业态1' },
              { value: 2, text: '业态2' },
              { value: 3, text: '业态3' },
            ],
            onFilter: (value, record) => record.propertyType.includes(value),
            render: (text, record, index) => (
              <AutoCell
                type="select"
                value={text}
                options={useMemo(
                  () => [
                    { value: 1, label: '业态1' },
                    { value: 2, label: '业态2' },
                    { value: 3, label: '业态3' },
                  ],
                  []
                )}
                disabled={record.propertyTypeDisable}
                warning={record.propertyTypeWarning}
                updateToData={useCallback(updateToData(index, 'propertyType'), [index])}
              />
            ),
          },
          {
            title: 'propertySubtype',
            dataIndex: 'propertySubtype',
            key: 'propertySubtype',
            width: 150,
            filters: [
              { value: 1, text: '物业类型1' },
              { value: 2, text: '物业类型2' },
              { value: 3, text: '物业类型3' },
            ],
            onFilter: (value, record) => record.propertySubtype.includes(value),
            render: (text, record, index) => (
              <AutoCell
                type="select"
                value={text}
                options={[
                  { value: 1, label: '物业类型1' },
                  { value: 2, label: '物业类型2' },
                  { value: 3, label: '物业类型3' },
                ]}
                disabled={record.propertySubtypeDisable}
                warning={record.propertySubtypeWarning}
                updateToData={useCallback(updateToData(index, 'propertySubtype'), [index])}
              />
            ),
          },
          {
            title: 'tenantAttribute',
            dataIndex: 'tenantAttribute',
            key: 'tenantAttribute',
            width: 150,
            filters: [
              { value: 1, text: '普通租户' },
              { value: 2, text: '主体组户' },
              { value: 3, text: '其他' },
            ],
            onFilter: (value, record) => record.tenantAttribute.includes(value),
            render: (text, record, index) => (
              <AutoCell
                type="select"
                value={text}
                options={[
                  { value: 1, label: '普通租户' },
                  { value: 2, label: '主体组户' },
                  { value: 3, label: '其他' },
                ]}
                disabled={record.tenantAttributeDisable}
                warning={record.tenantAttributeWarning}
                updateToData={useCallback(updateToData(index, 'tenantAttribute'), [index])}
              />
            ),
          },
          {
            title: 'tenantType',
            dataIndex: 'tenantType',
            key: 'tenantType',
            width: 150,
            filters: [
              { value: 1, text: '普通租户' },
              { value: 2, text: '主体组户' },
              { value: 3, text: '其他' },
            ],
            onFilter: (value, record) => record.tenantType.includes(value),
            render: (text, record, index) => (
              <AutoCell
                type="select"
                value={text}
                options={[
                  { value: 1, label: '普通租户' },
                  { value: 2, label: '主体组户' },
                  { value: 3, label: '其他' },
                ]}
                updateToData={useCallback(updateToData(index, 'tenantType'), [index])}
              />
            ),
          },
          {
            title: 'isTax',
            dataIndex: 'isTax',
            key: 'isTax',
            width: 150,
            render: (text, record, index) => (
              <AutoCell
                type="select"
                value={text}
                options={[
                  { value: 1, label: '是' },
                  { value: 0, label: '否' },
                ]}
                disabled={record.isTaxDisable}
                warning={record.isTaxWarning}
                updateToData={useCallback(updateToData(index, 'isTax'), [index])}
              />
            ),
          },
          {
            title: 'rentAlternative',
            dataIndex: 'rentAlternative',
            key: 'rentAlternative',
            width: 150,
            render: (text, record, index) => (
              <AutoCell
                type="number"
                value={text}
                disabled={record.rentAlternativeDisable}
                warning={record.rentAlternativeWarning}
                updateToData={useCallback(updateToData(index, 'rentAlternative'), [index])}
              />
            ),
          },
          {
            title: 'constructionArea',
            dataIndex: 'constructionArea',
            key: 'constructionArea',
            width: 150,
            render: (text, record, index) => (
              <AutoCell
                type="number"
                value={text}
                updateToData={useCallback(updateToData(index, 'constructionArea'), [index])}
              />
            ),
          },
          {
            title: 'rentArea',
            dataIndex: 'rentArea',
            key: 'rentArea',
            width: 150,
            render: (text, record, index) => (
              <AutoCell
                type="number"
                value={text}
                updateToData={useCallback(updateToData(index, 'rentArea'), [index])}
              />
            ),
          },
        ],
      },
      {
        title: 'section1',
        children: [
          {
            title: 'rentStartDate',
            dataIndex: 'rentStartDate',
            key: 'rentStartDate',
            width: 150,
            render: (text, record, index) => (
              <AutoCell
                type="date"
                value={text}
                updateToData={useCallback(updateToData(index, 'rentStartDate'), [index])}
              />
            ),
          },
          {
            title: 'rentEndDate',
            dataIndex: 'rentEndDate',
            key: 'rentEndDate',
            width: 150,
            render: (text, record, index) => (
              <AutoCell
                type="date"
                value={text}
                updateToData={useCallback(updateToData(index, 'rentEndDate'), [index])}
              />
            ),
          },
          // {
          //   title: 'YP year',
          //   dataIndex: 'termYearYP',
          //   key: 'termYearYP',
          //   width: 150,

          //   render: (text, record, index) => (
          //     <AutoCell
          //       type="number"
          //       value={text}
          //       updateToData={useCallback(updateToData(index, 'termYearYP'), [index])}
          //     />
          //   ),
          // },
          // {
          //   title: 'PV year',
          //   dataIndex: 'termYearPV',
          //   key: 'termYearPV',
          //   width: 150,
          //   render: (text, record, index) => (
          //     <AutoCell
          //       type="number"
          //       value={text}
          //       updateToData={useCallback(updateToData(index, 'termYearPV'), [index])}
          //     />
          //   ),
          // },
          {
            title: <HeaderCell label="rentFreeStartDate" text="选填" />,
            dataIndex: 'rentFreeStartDate',
            key: 'rentFreeStartDate',
            width: 150,
            render: (text, record, index) => (
              <AutoCell
                type="date"
                value={text}
                updateToData={useCallback(updateToData(index, 'rentFreeStartDate'), [index])}
              />
            ),
          },
          {
            title: <HeaderCell label="rentFreeEndDate" text="选填" />,
            dataIndex: 'rentFreeEndDate',
            key: 'rentFreeEndDate',
            width: 150,
            render: (text, record, index) => (
              <AutoCell
                type="date"
                value={text}
                updateToData={useCallback(updateToData(index, 'rentFreeEndDate'), [index])}
              />
            ),
          },
          {
            title: 'rentUnit',
            dataIndex: 'rentUnit',
            key: 'rentUnit',
            width: 150,
            render: (text, record, index) => (
              <AutoCell
                type="select"
                value={text}
                options={[
                  { value: 1, label: 'yuan' },
                  { value: 2, label: 'mao' },
                ]}
                updateToData={useCallback(updateToData(index, 'rentUnit'), [index])}
              />
            ),
          },
          {
            title: <HeaderCell label="rentUnitPrice" tooltipText="如果已填写了免租期，此处请输入面价" />,
            dataIndex: 'rentUnitPrice',
            key: 'rentUnitPrice',
            width: 150,
            render: (text, record, index) => (
              <AutoCell
                type="number"
                value={text}
                updateToData={useCallback(updateToData(index, 'rentUnitPrice'), [index])}
              />
            ),
          },
          {
            title: <HeaderCell label="annualRent" tooltipText="如果已填写了免租期，此处请输入面价" />,
            dataIndex: 'annualRent',
            key: 'annualRent',
            width: 150,
            render: (text, record, index) => (
              <AutoCell
                type="number"
                value={text}
                updateToData={useCallback(updateToData(index, 'annualRent'), [index])}
              />
            ),
          },
          {
            title: 'actualRent',
            dataIndex: 'actualRent',
            key: 'actualRent',
            width: 150,
            render: (text, record, index) => (
              <AutoCell
                type="number"
                value={text}
                updateToData={useCallback(updateToData(index, 'actualRent'), [index])}
              />
            ),
          },
          // {
          //   title: 'YP term',
          //   dataIndex: 'termValueYP',
          //   key: 'termValueYP',
          //   width: 150,
          //   render: (text, record, index) => (
          //     <AutoCell
          //       type="number"
          //       value={text}
          //       disabled={record.termValueYPDisable}
          //       warning={record.termValueYPWarning}
          //       updateToData={useCallback(updateToData(index, 'termValueYP'), [index])}
          //     />
          //   ),
          // },
          // {
          //   title: 'PV term',
          //   dataIndex: 'termValuePV',
          //   key: 'termValuePV',
          //   width: 150,
          //   render: (text, record, index) => (
          //     <AutoCell
          //       type="number"
          //       value={text}
          //       disabled={record.termValuePVDisable}
          //       warning={record.termValuePVWarning}
          //       updateToData={useCallback(updateToData(index, 'termValuePV'), [index])}
          //     />
          //   ),
          // },
          {
            title: 'termValue',
            dataIndex: 'termValue',
            key: 'termValue',
            width: 150,
            render: (text, record, index) => (
              <AutoCell
                type="number"
                value={text}
                updateToData={useCallback(updateToData(index, 'termValue'), [index])}
              />
            ),
          },
        ],
      },
      {
        title: 'section2',
        children: [
          {
            title: 'marketRent',
            dataIndex: 'marketRent',
            key: 'marketRent',
            width: 150,
            render: (text, record, index) => (
              <AutoCell
                type="number"
                value={text}
                updateToData={useCallback(updateToData(index, 'marketRent'), [index])}
              />
            ),
          },
          {
            title: 'vacancyRate',
            dataIndex: 'vacancyRate',
            key: 'vacancyRate',
            width: 150,
            render: (text, record, index) => (
              <AutoCell
                type="number"
                value={text}
                updateToData={useCallback(updateToData(index, 'vacancyRate'), [index])}
              />
            ),
          },
          {
            title: 'annualRentOutOfLease',
            dataIndex: 'annualRentOutOfLease',
            key: 'annualRentOutOfLease',
            width: 150,
            render: (text, record, index) => (
              <AutoCell
                type="number"
                value={text}
                updateToData={useCallback(updateToData(index, 'annualRentOutOfLease'), [index])}
              />
            ),
          },
          {
            title: 'remainingYearPeriod',
            dataIndex: 'remainingYearPeriod',
            key: 'remainingYearPeriod',
            width: 150,
            render: (text, record, index) => (
              <AutoCell
                type="number"
                value={text}
                updateToData={useCallback(updateToData(index, 'remainingYearPeriod'), [index])}
              />
            ),
          },
          // {
          //   title: 'YP reversionary',
          //   dataIndex: 'reversionaryValueYP',
          //   key: 'reversionaryValueYP',
          //   width: 150,
          //   render: (text, record, index) => (
          //     <AutoCell
          //       type="number"
          //       value={text}
          //       disabled={record.reversionaryValueYPDisable}
          //       warning={record.reversionaryValueYPWarning}
          //       updateToData={useCallback(updateToData(index, 'reversionaryValueYP'), [index])}
          //     />
          //   ),
          // },
          // {
          //   title: 'PV reversionary',
          //   dataIndex: 'reversionaryValueYP',
          //   key: 'reversionaryValueYP',
          //   width: 150,
          //   render: (text, record, index) => (
          //     <AutoCell
          //       type="number"
          //       value={text}
          //       disabled={record.reversionaryValueYPDisable}
          //       warning={record.reversionaryValueYPWarning}
          //       updateToData={useCallback(updateToData(index, 'reversionaryValueYP'), [index])}
          //     />
          //   ),
          // },

          {
            title: 'reversionaryValue',
            dataIndex: 'reversionaryValue',
            key: 'reversionaryValue',
            width: 150,
            render: (text, record, index) => (
              <AutoCell
                type="number"
                value={text}
                updateToData={useCallback(updateToData(index, 'reversionaryValue'), [index])}
              />
            ),
          },
        ],
      },
      {
        title: 'section3',
        children: [
          {
            title: 'marketValuation',
            dataIndex: 'marketValuation',
            key: 'marketValuation',
            width: 150,
            render: (text, record, index) => (
              <AutoCell
                type="number"
                value={text}
                updateToData={useCallback(updateToData(index, 'marketValuation'), [index])}
              />
            ),
          },
          {
            title: 'marketUnitPrice',
            dataIndex: 'marketUnitPrice',
            key: 'marketUnitPrice',
            width: 150,
            render: (text, record, index) => (
              <AutoCell
                type="number"
                value={text}
                updateToData={useCallback(updateToData(index, 'marketUnitPrice'), [index])}
              />
            ),
          },
        ],
      },
      {
        title: 'operation',
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
