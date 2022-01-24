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
        title: '基本信息',
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
            title: '单元号',
            dataIndex: 'tenantNo',
            key: 'tenantNo',
            width: 150,
            render: (text, record, index) => (
              <AutoCell value={text} type="text" updateToData={useCallback(updateToData(index, 'tenantNo'), [index])} />
            ),
          },
          {
            title: <HeaderCell label="期数" tooltipText="前后填写方式须保持一致" />,
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
            title: <HeaderCell label="楼栋" tooltipText="前后填写方式须保持一致" />,
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
            title: <HeaderCell label="楼层" tooltipText="前后填写方式须保持一致" />,
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
            title: '状态',
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
            title: '承租方',
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
            title: '业态',
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
            title: '物业类型',
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
            title: '租户属性',
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
            title: '租户类型',
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
            title: '是否含税',
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
            title: '计税口径',
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
            title: '建筑面积',
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
            title: '建筑面积',
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
        title: '租期内价值',
        children: [
          {
            title: '起租日期',
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
            title: '终止日期',
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
            title: <HeaderCell label="免租起始日" text="选填" />,
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
            title: <HeaderCell label="免租终止日" text="选填" />,
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
            title: '租金单位',
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
            title: <HeaderCell label="单位租金" tooltipText="如果已填写了免租期，此处请输入面价" />,
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
            title: <HeaderCell label="年租" tooltipText="如果已填写了免租期，此处请输入面价" />,
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
            title: '应收',
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
            title: '租期内价值',
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
        title: '还原价值',
        children: [
          {
            title: '市场租金',
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
            title: '空置率',
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
            title: '租期外年租',
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
            title: '剩余年期',
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
            title: '还原价值',
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
        title: '市场价值',
        children: [
          {
            title: '估值',
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
            title: '单价',
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
