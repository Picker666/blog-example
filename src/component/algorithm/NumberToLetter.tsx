const NumberToLetter = () => {
  const func = (num) => {
    const length = num.length;
    if (length === 0) {
      return 1;
    }
    let count = 0;
    const current = num[0];
    let crtDouble = 0;
    if (length >= 2) {
      crtDouble = num.slice(0, 2);
    }

    if (current == 0) {
      return 0;
    } else {
      if (current < 10) {
        count += func(num.slice(1));
      }
      if (crtDouble && crtDouble < 27) {
        count += func(num.slice(2));
      }
    }

    return count;
  };

  const handleClick = () => {
    const count = func('16');
    console.log('count: ', count);
  };

  return (
    <div>
      <button onClick={handleClick}>click</button>
    </div>
  );
};

export default NumberToLetter;
