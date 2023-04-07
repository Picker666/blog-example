import { useState, memo, useMemo, useEffect } from "react";

import { Select } from "antd";

const { Option } = Select;

type dropdownProps = {
  value: string | number | undefined;
  updateToData: (value: string | number | undefined) => void;
  options: { label: string; value: string | number }[];
  onBlur: () => void;
};

const DropdownCell = (props: dropdownProps) => {
  const { value, updateToData, options = [], onBlur } = props;
  const [selecteOptions, setSelecteOptions] = useState(options);

  console.log("=============Dropdown Cell================");

  useEffect(() => {
    setSelecteOptions(options);
  }, [options]);

  const handleChange = (selectedV) => {
    if (value !== selectedV) {
      updateToData(selectedV);
    }
  };

  return (
    <Select
      value={value}
      style={{ width: "100%" }}
      onChange={handleChange}
      options={selecteOptions}
      onBlur={onBlur}
      defaultOpen
      autoFocus
    />
  );
};

export default memo(DropdownCell);
