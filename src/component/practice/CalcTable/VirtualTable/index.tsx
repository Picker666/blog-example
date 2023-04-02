import React, { useState, useEffect, useMemo, useCallback, memo } from 'react';
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';

import VirtualTable from './VirtualTable';

import './index.less';

type tableProps = {
  columns: { [key: string]: string }[];
  scroll: { x: number; y: number };
  dataSource: { [key: string]: string }[];
  lengthChange?: boolean;
};

const VirtualTableContainer = (props: tableProps) => {
  const { columns, scroll, dataSource, lengthChange } = props;
  const [showOperateBtn, setShowOperateBtn] = useState(true);
  const [showArrow, setShowArrow] = useState(false);

  const fixedColumnExecutor = (right, currentShow) => {
    const fixedCells = document.querySelectorAll('.tableContainer .virtual-table-cell-last-fixed');
    const fixedHeaderCell = document.querySelector('.tableContainer .ant-table-cell-fix-right-first');

    if (currentShow) {
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
    setShowOperateBtn(!currentShow);
  };

  const getScrollPosition = () => {
    const dom = document.querySelector('.virtual-grid');
    const { scrollLeft } = dom;
    return scrollLeft;
  };

  const handleArrowClick = () => {
    let right = 'auto';
    if (!showOperateBtn) {
      const currentPostion = getScrollPosition();
      right = `-${currentPostion}px`;
    }
    fixedColumnExecutor(right, showOperateBtn);
  };

  const scrollExecutor = (e) => {
    if (showOperateBtn) {
      fixedColumnExecutor('auto', showOperateBtn);
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
      }, 100);
    };
  };

  const handleScroll = useCallback(handleScrollThrottle(), [showOperateBtn]);

  const handleScrollInitial = () => {
    const dom = document.querySelector('.virtual-grid');
    handleScroll({ target: dom });
  };

  useEffect(() => {
    handleScrollInitial();
  }, []);

  useEffect(() => {
    const dom = document.querySelector('.virtual-grid');
    dom.addEventListener('scroll', handleScroll, false);
    return () => {
      dom.removeEventListener('scroll', handleScroll, false);
    };
  }, [showOperateBtn]);

  useEffect(() => {
    if (lengthChange) {
      if (showOperateBtn) {
        setTimeout(() => {
          const dom = document.querySelector('.virtual-grid');
          const { scrollLeft: cuttent } = dom;

          const right = `-${cuttent}px`;
          fixedColumnExecutor(right, false);
        }, 200);
      }
    } else {
      handleScrollInitial();
    }
  }, [dataSource]);

  // const scrollInfo = useMemo(() => scroll, [scroll]);
  // const data = useMemo(() => dataSource, [dataSource]);
  // const columnsInfo = useMemo(() => columns, [columns]);

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
        {showOperateBtn ? <DoubleRightOutlined className="arrow" /> : <DoubleLeftOutlined className="arrow" />}
      </div>
      <VirtualTable scroll={scroll} dataSource={dataSource} columns={columns} />
    </>
  );
};

export default memo(VirtualTableContainer);
