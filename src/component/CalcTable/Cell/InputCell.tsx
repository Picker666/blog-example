import { useState, memo, useEffect, useRef } from 'react';

import { Input } from 'antd';

type inputProps = {
  value: string | number | undefined;
  updateToData: (value: string | number | undefined) => void;
  focused?: boolean;
  onBlur: () => void;
};

const InputCell = (props: inputProps) => {
  const { value, updateToData, onBlur, focused = true } = props;
  const [inputValue, setInputValue] = useState(value);
  const inputRef = useRef(null);

  console.log('=============InputCell================');

  useEffect(() => {
    setInputValue(value);
    if (focused) {
      inputRef.current.focus();
    }
  }, [value]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    onBlur();
    if (value !== inputValue) {
      updateToData(inputValue);
    }
  };

  return <Input value={inputValue} ref={inputRef} onChange={handleInputChange} onBlur={handleInputBlur} />;
};

export default memo(InputCell);
