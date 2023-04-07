import { useMemo, memo, useState } from "react";
import moment from "moment";

import { DatePicker } from "antd";

type datePickerProps = {
  value: string | undefined;
  updateToData: (value: string | number) => void;
  onBlur: () => void;
};

const DatePickerCell = (props: datePickerProps) => {
  const { value, updateToData, onBlur } = props;
  const [open, setOpen] = useState(true);

  const date = useMemo(() => (value && moment(value)) || null, [value]);

  console.log("=============DatePickerCell================");

  const handleChange = (momentDate, currentDate) => {
    setOpen(false);
    if (currentDate !== value) {
      updateToData(currentDate);
    }
  };

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <DatePicker
      value={date}
      onChange={handleChange}
      onBlur={onBlur}
      autoFocus
      open={open}
      onClick={handleClick}
    />
  );
};

export default memo(DatePickerCell);
