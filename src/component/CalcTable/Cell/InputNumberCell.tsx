/* eslint-disable react/jsx-props-no-spreading */
import { useState, memo, useEffect, useRef } from 'react';

import { InputNumber } from 'antd';

type inputNumberProps = {
  value: string | number | undefined;
  updateToData: (value: string | number | undefined) => void;
  onBlur: () => void;
  focused?: boolean;
};

const InputNumberCell = (props: inputNumberProps) => {
  const { value, updateToData, onBlur, focused = true, ...rest } = props;
  const [inputValue, setInputValue] = useState(value);
  const inputRef = useRef(null);

  console.log('=============InputCell================');

  useEffect(() => {
    setInputValue(value);
    if (focused) {
      inputRef.current.focus();
    }
  }, [value]);

  const handleInputChange = (vl: number | string | null) => {
    setInputValue(vl);
  };

  const handleInputBlur = () => {
    onBlur();
    if (value !== inputValue) {
      updateToData(inputValue);
    }
  };

  return (
    <InputNumber
      value={inputValue}
      style={{ width: '100%' }}
      ref={inputRef}
      onChange={handleInputChange}
      onBlur={handleInputBlur}
      {...rest}
    />
  );
};

export default memo(InputNumberCell);
