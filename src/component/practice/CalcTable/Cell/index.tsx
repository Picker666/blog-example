/* eslint-disable react/jsx-props-no-spreading */
import { useState, useMemo, memo } from "react";
import { areEqual } from "react-window";

import InputCell from "./InputCell";
import InputNumberCell from "./InputNumberCell";
import DatePickerCell from "./DatePickerCell";
import DropdownCell from "./DropdownCell";

import "./index.less";

type cellProps = {
  type: string;
  value: string | number | undefined;
  updateToData: (value: string | number | undefined) => void;
  disabled?: boolean;
  warning?: boolean;
  options?: { label: string; value: string | number }[];
  // [key: string]: string;
};

let sign = false;

const Cell = (props: cellProps) => {
  const {
    type,
    value,
    updateToData,
    disabled = false,
    warning = false,
    options = [],
    ...rest
  } = props;

  const [fouse, setFouse] = useState(false);

  const handleCellClick = () => {
    if (!disabled) {
      setFouse(true);
      sign = true;
    }
  };

  console.log("==============cell==============");

  const handleCellBlur = () => {
    fouse && setFouse(false);
    sign = false;
  };

  const handleMouseOut = () => {
    if (fouse && sign) {
      setFouse(false);
      sign = false;
    }
  };

  const handleMouseOver = () => {
    if (!fouse && !sign) {
      setFouse(true);
      sign = true;
    }
  };

  const spanCls = useMemo(() => {
    let cls = "cellInner";
    if (warning) {
      cls = `${cls} warning`;
    }
    if (disabled) {
      cls = `${cls} disabled`;
    }
    return cls;
  }, [disabled, warning]);

  let spanProps = {};
  let compProps = {};

  if (type === "number" || type === "text") {
    spanProps = {
      onMouseOver: handleMouseOver,
      onmouseenter: handleMouseOver,
    };
    compProps = {
      onmouseout: handleMouseOut,
      onmouseleave: handleMouseOut,
    };
  }

  if (fouse) {
    const commonProps = {
      value,
      updateToData,
      onBlur: handleCellBlur,
      ...rest,
    };
    if (type === "text") {
      return <InputCell {...commonProps} {...compProps} />;
    }
    if (type === "number") {
      return <InputNumberCell {...commonProps} {...compProps} />;
    }
    if (type === "date") {
      return <DatePickerCell {...commonProps} />;
    }
    if (type === "select") {
      return <DropdownCell {...commonProps} options={options} />;
    }
  }

  if (type === "select") {
    const selectOption = options.find((option) => option.value === value) || {
      label: value,
    };
    return (
      <span className={spanCls} onClick={handleCellClick} role="cell">
        {selectOption.label}
      </span>
    );
  }

  return (
    <span
      className={spanCls}
      onClick={handleCellClick}
      role="cell"
      {...spanProps}
    >
      {value}
    </span>
  );
};

export default memo(Cell, areEqual);
