const ArrayFlat = () => {
  const flat = (arr, dep) => {
    const newArr = arr.reduce((res, a) => {
      if (Array.isArray(a) && dep > 0) {
        const arrInner = flat(a, dep - 1);
        res = res.concat(arrInner);
      } else {
        res.push(a);
      }
      return res;
    }, []);

    return newArr;
  };

  const flat1 = (arr, dep) => {
    const newArr = arr.reduce((res, a) => res.concat(Array.isArray(a) && dep > 0 ? flat(a, dep - 1) : a), []);

    return newArr;
  };

  const handleClick = () => {
    const arr = [
      1,
      [11, 22, 33, [111, 222, 333, [1111, 2222]]],
      2,
      3,
      [44, 55, 66, [444, 555, 666, [4444, 5555, 6666]]],
      7,
    ];
    const flatArr = flat(arr, 3);
    console.log('flatArr: ', flatArr);
  };
  return (
    <div>
      <button onClick={handleClick}>goo</button>
    </div>
  );
};

export default ArrayFlat;
