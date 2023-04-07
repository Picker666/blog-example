import React, { useState, useEffect, useRef, useMemo, memo } from "react";
import { VariableSizeGrid as Grid } from "react-window";
import ResizeObserver from "rc-resize-observer";
import classNames from "classnames";
import { Table } from "antd";

import "./index.less";

type tableProps = {
  columns: { [key: string]: string }[];
  scroll: { x: number; y: number };
  dataSource: { [key: string]: string }[];
};

const VirtualTable = (props: tableProps) => {
  const { columns, scroll, dataSource } = props;
  const [tableWidth, setTableWidth] = useState(0);

  const flatColumns = useMemo(() => {
    let flat = [];
    columns.forEach((column) => {
      const { children } = column;
      if (children) {
        flat = [...flat, ...children];
      } else {
        flat = [...flat, column];
      }
    });
    return flat;
  }, [columns]);

  const gridRef = useRef<any>();
  const [connectObject] = useState<any>(() => {
    const obj = {};
    Object.defineProperty(obj, "scrollLeft", {
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

  const renderVirtualRow = (rawData) =>
    function row(rowProps: {
      columnIndex: number;
      rowIndex: number;
      style: React.CSSProperties;
    }) {
      const { columnIndex, rowIndex, style } = rowProps;
      const { render, dataIndex, fixed } = flatColumns[columnIndex] as {
        render;
        dataIndex;
        fixed;
      };
      const currentRecord = rawData[rowIndex];

      const value = currentRecord[dataIndex];
      const lastOne = columnIndex === flatColumns.length - 1;
      return (
        <div
          className={classNames("virtual-table-cell", {
            "virtual-table-cell-last-fixed": lastOne && fixed,
          })}
          style={style}
          key={`${rowIndex}_${columnIndex}`}
        >
          {(render && render(value, currentRecord, rowIndex)) || value}
        </div>
      );
    };

  const renderVirtualList = (
    rawData: object[],
    rowAttr: {
      scrollbarSize: number;
      ref: { current: object };
      onScroll: (scrollData: { scrollLeft: number }) => void;
    }
  ) => {
    const { scrollbarSize, ref, onScroll } = rowAttr;
    const replacementRef = ref;
    replacementRef.current = connectObject;
    const totalHeight = rawData.length * 54;
    const columnCount = flatColumns.length;

    return (
      <Grid
        ref={gridRef}
        className="virtual-grid"
        columnCount={columnCount}
        columnWidth={(index: number) => {
          const { width } = flatColumns[index] || { width: 0 };
          return totalHeight > scroll!.y! && index === columnCount - 1
            ? (width as number) - scrollbarSize - 1
            : (width as number);
        }}
        height={scroll!.y as number}
        rowCount={rawData.length}
        rowHeight={() => 50}
        // overscanRowCount={30}
        overscanColumnCount={columnCount}
        width={tableWidth}
        onScroll={onScroll}
      >
        {renderVirtualRow(rawData)}
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
        style={{ marginTop: 24 }}
        scroll={scroll}
        dataSource={dataSource}
        className="virtual-table"
        rowKey={(record) => record.dataIndex}
        columns={columns}
        pagination={false}
        components={{
          body: renderVirtualList,
        }}
      />
    </ResizeObserver>
  );
};

export default memo(VirtualTable);
