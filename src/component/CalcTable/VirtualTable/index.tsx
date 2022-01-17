import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';

import VirtualTable from './VirtualTable';

import './index.less';

type tableProps = {
  columns: { [key: string]: string }[];
  scroll: { x: number; y: number };
  dataSource: { [key: string]: string }[];
};

const VirtualTableContainer = (props: tableProps) => {
  const { columns, scroll, dataSource } = props;
  const [showOperateBtn, setShowOperateBtn] = useState(true);
  const [showArrow, setShowArrow] = useState(false);

  const fixedColumnExecutor = (right) => {
    const fixedCells = document.querySelectorAll('.tableContainer .virtual-table-cell-last-fixed');
    const fixedHeaderCell = document.querySelector('.tableContainer .ant-table-cell-fix-right-first');

    if (showOperateBtn) {
      fixedCells.forEach((cell) => {
        const replacement = cell as HTMLElement;
        replacement.style.right = right;
        replacement.classList.remove('cell-last-fixed-slide');
      });
      fixedHeaderCell.classList.replace('ant-table-cell-fix-right', 'ant-table-cell-fix-right-static');
    } else {
      fixedCells.forEach((cell) => {
        const replacement = cell as HTMLElement;
        replacement.style.right = right;
        replacement.classList.add('cell-last-fixed-slide');
      });
      fixedHeaderCell.classList.replace('ant-table-cell-fix-right-static', 'ant-table-cell-fix-right');
    }
    setShowOperateBtn(!showOperateBtn);
  };

  const handleArrowClick = () => {
    const dom = document.querySelector('.virtual-grid');
    const { scrollLeft: cuttent } = dom;

    if (showOperateBtn) {
      fixedColumnExecutor('auto');
    } else {
      const right = `-${cuttent}px`;
      fixedColumnExecutor(right);
    }
  };

  const scrollExecutor = (e) => {
    if (showOperateBtn) {
      fixedColumnExecutor('auto');
    }

    const { scrollLeft: cuttent, clientWidth } = e.target;

    const {
      style: { width },
    } = document.querySelector('.virtual-grid > div') as HTMLElement;
    const w = Number(width.replace('px', ''));

    if (w - clientWidth - cuttent >= 180) {
      setShowArrow(true);
    } else {
      setShowArrow(false);
    }
  };
  const handleScrollThrottle = () => {
    let tiemout = null;

    return (e) => {
      if (tiemout) {
        return;
      }
      // scrollExecutor(e);

      tiemout = setTimeout(() => {
        scrollExecutor(e);
        tiemout = null;
      }, 200);
    };
  };

  const handleScroll = useCallback(handleScrollThrottle(), [showOperateBtn]);

  useEffect(() => {
    const dom = document.querySelector('.virtual-grid');
    handleScroll({ target: dom });
  }, []);

  useEffect(() => {
    const dom = document.querySelector('.virtual-grid');
    dom.addEventListener('scroll', handleScroll, false);
    return () => {
      dom.removeEventListener('scroll', handleScroll, false);
    };
  }, [showOperateBtn]);

  const scrollInfo = useMemo(() => scroll, [scroll]);
  const data = useMemo(() => dataSource, [dataSource]);
  const columnsInfo = useMemo(() => columns, [columns]);

  const arrowCls = useMemo(() => {
    let cls = 'arrowContainer';
    if (showArrow) {
      cls = `${cls} arrowShow`;
    }
    return cls;
  }, [showArrow]);

  return (
    <>
      <div className={arrowCls} onClick={handleArrowClick} role="alert">
        {showOperateBtn ? <DoubleRightOutlined /> : <DoubleLeftOutlined />}
      </div>
      <span className="headerMark" />
      <VirtualTable scroll={scrollInfo} dataSource={data} columns={columnsInfo} />
    </>
  );
};

export default VirtualTableContainer;
