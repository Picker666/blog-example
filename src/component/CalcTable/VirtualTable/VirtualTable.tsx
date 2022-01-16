import React, { useState, useEffect, useRef, memo } from 'react';
import { VariableSizeGrid as Grid } from 'react-window';
import ResizeObserver from 'rc-resize-observer';
import classNames from 'classnames';
import { Table } from 'antd';

import './index.less';

type tableProps = {
  columns: { [key: string]: string }[];
  scroll: { x: number; y: number };
  dataSource: { [key: string]: string }[];
};

const VirtualTable = (props: tableProps) => {
  const { columns, scroll, dataSource } = props;
  const [tableWidth, setTableWidth] = useState(0);

  const widthColumnCount = columns.filter(({ width }) => !width).length;
  const mergedColumns = columns.map((column) => {
    if (column.width) {
      return column;
    }

    return {
      ...column,
      width: Math.floor(tableWidth / widthColumnCount),
    };
  });

  const gridRef = useRef<any>();
  const [connectObject] = useState<any>(() => {
    const obj = {};
    Object.defineProperty(obj, 'scrollLeft', {
      get: () => null,
      set: (scrollLeft: number) => {
        if (gridRef.current) {
          gridRef.current.scrollTo({ scrollLeft });
        }
      },
    });

    return obj;
  });

  const resetVirtualGrid = () => {
    gridRef.current.resetAfterIndices({
      columnIndex: 0,
      shouldForceUpdate: true,
    });
  };

  useEffect(() => resetVirtualGrid, [tableWidth]);

  const renderVirtualList = (
    rawData: object[],
    rowAttr: { scrollbarSize: number; ref: { current: object }; onScroll: (scrollData: { scrollLeft: number }) => void }
  ) => {
    const { scrollbarSize, ref, onScroll } = rowAttr;
    const replacementRef = ref;
    replacementRef.current = connectObject;
    const totalHeight = rawData.length * 54;

    return (
      <Grid
        ref={gridRef}
        className="virtual-grid"
        columnCount={mergedColumns.length}
        columnWidth={(index: number) => {
          const { width } = mergedColumns[index];
          return totalHeight > scroll!.y! && index === mergedColumns.length - 1
            ? (width as number) - scrollbarSize - 1
            : (width as number);
        }}
        height={scroll!.y as number}
        rowCount={rawData.length}
        rowHeight={() => 54}
        width={tableWidth}
        onScroll={onScroll}
      >
        {(rowProps: { columnIndex: number; rowIndex: number; style: React.CSSProperties }) => {
          const { columnIndex, rowIndex, style } = rowProps;
          const currentRecord = rawData[rowIndex];
          const { render, dataIndex, fixed } = mergedColumns[columnIndex] as { render; dataIndex; fixed };
          const value = currentRecord[dataIndex];

          const lastOne = columnIndex === mergedColumns.length - 1;
          return (
            <div
              className={classNames('virtual-table-cell', {
                'virtual-table-cell-last': lastOne,
                'virtual-table-cell-last-fixed': lastOne && fixed,
              })}
              style={style}
            >
              {(render && render(value, currentRecord, rowIndex)) || value}
            </div>
          );
        }}
      </Grid>
    );
  };

  return (
    <ResizeObserver
      onResize={({ width }) => {
        setTableWidth(width);
      }}
    >
      <Table
        style={{ marginTop: 24, marginBottom: 64 }}
        scroll={scroll}
        dataSource={dataSource}
        className="virtual-table"
        columns={mergedColumns}
        pagination={false}
        components={{
          body: renderVirtualList,
        }}
      />
    </ResizeObserver>
  );
};

export default memo(VirtualTable);
