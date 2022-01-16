/* eslint-disable react/jsx-props-no-spreading */
import { useState, useMemo } from 'react';
import InputCell from './InputCell';
import InputNumberCell from './InputNumberCell';
import DatePickerCell from './DatePickerCell';
import DropdownCell from './DropdownCell';

import './index.less';

type cellProps = {
  type: string;
  value: string | number | undefined;
  updateToData: (value: string | number | undefined) => void;
  disabled: boolean;
  warning: boolean;
  options?: { label: string; value: string }[];
};

const Cell = (props: cellProps) => {
  const { type, value, updateToData, disabled, warning, options } = props;

  const [fouse, setFouse] = useState(false);

  const handleCellClick = () => {
    if (!disabled) {
      setFouse(true);
    }
  };

  const handleCellBlur = () => {
    setFouse(false);
  };

  const spanCls = useMemo(() => {
    let cls = 'cellInner';
    if (warning) {
      cls = `${cls} warning`;
    }
    if (disabled) {
      cls = `${cls} disabled`;
    }
    return cls;
  }, [disabled, warning]);

  if (fouse) {
    const commonProps = {
      value,
      updateToData,
      onBlur: handleCellBlur,
    };
    if (type === 'text') {
      return <InputCell {...commonProps} />;
    }
    if (type === 'number') {
      return <InputNumberCell {...commonProps} />;
    }
    if (type === 'date') {
      return <DatePickerCell {...commonProps} />;
    }
    if (type === 'select') {
      return <DropdownCell {...commonProps} options={options} />;
    }
  }

  return (
    <span className={spanCls} onClick={handleCellClick} role="cell">
      {value}
    </span>
  );
};

export default Cell;
