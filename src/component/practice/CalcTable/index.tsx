import { useState, useEffect, useRef } from 'react';
import { Button} from 'antd';
import { PlusOutlined } from "@ant-design/icons";

import VirtualTable from './VirtualTable';

import useColumns from './useColumns';

import './index.less';

type calcTableProps = {
  options: { label: string; value: string }[];
  disabled: boolean;
};

const validateFields = [
  'phaseNo',
  'buildingNo',
  'floorNo',
  'status',
  'propertyType',
  'propertySubtype',
  'tenantAttribute',
  'isTax',
  'rentAlternative',
];

const CalcTable = (props: calcTableProps) => {
  const { options, disabled } = props;
  const [data, setData] = useState([]);
  const [lengthChange, setLengthChange] = useState(false);
  const dataRef = useRef(data);

  useEffect(() => {
    const tableData = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 30; i++) {
      tableData.push({
        draftId: 1, // 底稿id [number]
        id: 1, // 行id [number]
        index: i + 1,
        tenantNo: `abc_${i + 1}`, // 单元号 [string]
        phaseNo: '1', // 期数 [string]
        buildingNo: '1', // 楼栋 [string]
        floorNo: 'L1', // 楼层 [string]
        status: 1, // 状态 [number] 枚举
        alternatives: 'xxxxx', // 承租方 [string]
        propertyType: 1, // 业态 [number] 枚举
        propertySubtype: 1, // 物业类型 [number] 枚举
        tenantAttribute: 1, // 租户属性 [number] 枚举
        tenantType: 1, // 租户类型 [number] 枚举
        isTax: true, // 是否含税 [boolean]
        rentAlternative: 1, // 计租口径 [number] 枚举
        constructionArea: 2000.0, // 建筑面积 [number]
        rentArea: 1000.0, // 租赁面积 [number]
        rentStartDate: '2018-07-01', // 起租日期 [string]
        rentEndDate: '2019-06-30', // 终止日期 [string]
        termYearYP: 0.42, // YP year [number]
        termYearPV: 1.42, // PV year [number]
        rentFreeStartDate: '2018-07-01', // 免租起始日 [number]
        rentFreeEndDate: '2019-06-30', // 免租终止日 [number]
        rentUnit: 1, // 租金单位 [number] 枚举
        rentUnitPrice: 34.0, // 单位租金 [number]
        annualRent: 12345.0, // 年租 [number]
        actualRent: 12345.0, // 应收 [number]
        termValueYP: 0.41, // YP [number] term
        termValuePV: 0.9, // PV [number] term
        termValue: 2000.0, // 租期内价值 [number]
        marketRent: 6.0, // 市场租金 [number]
        vacancyRate: 0.05, // 空置率 [number]
        annualRentOutOfLease: 12345.0, // 租期外年租 [number]
        remainingYearPeriod: 27.02, // 剩余年期 [number]
        reversionaryValueYP: 13.1, // YP [number] reversionary
        reversionaryValuePV: 0.87, // PV [number] reversionary
        reversionaryValue: 2000, // 还原价值 [number]
        marketValuation: 39945.9, // 估值 [number]
        marketUnitPrice: 2000.0, // 单价 [number]
      });
    }
    setData(tableData);
  }, []);

  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  const updateToData = (index, key) => (value) => {
    let newData = [...dataRef.current];
    newData[index][key] = value;
    if (key === 'index') {
      if (value > newData) {
        return;
      }
      const replaceStartIndex = value;
      let deleteStartIndex = index;
      if (value < index + 1) {
        // replaceStartIndex = replaceStartIndex;
        deleteStartIndex = index + 1;
      }
      newData.splice(replaceStartIndex, 0, newData[index]);
      newData.splice(deleteStartIndex, 1);

      newData = newData.map((d, i) => ({ ...d, index: i + 1 }));
    }
    if (validateFields.includes(key)) {
      // remove warning, when change value
      newData[index][`${key}Warning`] = undefined;
    }
    setData(newData);
    lengthChange && setLengthChange(false);
  };

  const handldWithCopy = (index) => () => {
    const newData = [...dataRef.current];

    const preSetData = {};
    const copiedRow = newData[index];
    let canCopy = true;

    validateFields.forEach((field: string) => {
      const temp = copiedRow[field];
      preSetData[field] = temp;
      if ([undefined, null, ''].includes(temp)) {
        copiedRow[`${field}Warning`] = true;
        canCopy = false;
      }
    });

    if (canCopy) {
      newData.splice(index + 1, 0, preSetData);
      !lengthChange && setLengthChange(true);
    } else {
      newData.splice(index, 1, copiedRow);
    }

    setData(newData);
  };

  const handldWithDelete = (index) => () => {
    const newData = [...dataRef.current];
    newData.splice(index, 1);
    setData(newData);
    !lengthChange && setLengthChange(true);
  };

  const handleAddLease = () => {
    const newData = [...dataRef.current];
    newData.push({index: newData.length + 1})
    setData(newData);
    !lengthChange && setLengthChange(true);
    setTimeout(() => {
      const dom = document.querySelector('.virtual-grid');
      dom.scrollTop = dom.scrollHeight;
    }, 100)
  }

  const [columns, setColumns] = useColumns(updateToData, handldWithCopy, handldWithDelete, options);

  useEffect(() => {
    setColumns(options);
  }, [options, disabled]);

  return (
    <div className="tableContainer" id="calc">
      <div
        className="mark"
        style={{
          zIndex: (disabled && 3) || -1,
          marginTop: 24,
        }}
      />
      <VirtualTable columns={columns} dataSource={data} lengthChange={lengthChange} scroll={{ x: '100%', y: 500 }} />
      <Button type="dashed" block onClick={handleAddLease}><PlusOutlined />添加</Button>
    </div>
  );
};

export default CalcTable;
