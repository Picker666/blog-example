const VersionSorting = () => {
  const arr = ['0.1.1', '2.3.3', '0.302.1', '4.2', '4.3.5', '4.3.4.5', '0.1.1'];

  const sorting = () => {
    const sortingArr = arr.slice();
    sortingArr.sort((a, b) => {
      const arrA = a.split('.');
      const arrB = b.split('.');

      let i = 0;
      while (true) {
        const aVal = arrA[i];
        const bVal = arrB[i];
        if (aVal === undefined || bVal === undefined) {
          return arrA.length - arrB.length;
        } else if (aVal !== bVal) {
          return aVal - bVal;
        }
        i++;
      }
    });

    console.log(sortingArr);
  };

  const sorting2 = () => {
    const sortingArr = arr.slice();
    sortingArr.sort((a, b) => {
      const arrA = a.split('.');
      const arrB = b.split('.');

      let i = 0;
      while (true) {
        const aVal = arrA[i] ?? -1; // 有bug
        const bVal = arrB[i] ?? -1;
        if (aVal !== bVal) {
          return aVal - bVal;
        }
        i++;
      }
    });

    console.log(sortingArr);
  };

  const compare = (a, b) => {
    const arrA = a.split('.');
    const arrB = b.split('.');

    let i = 0;
    while (true) {
      const aVal = arrA[i];
      const bVal = arrB[i];
      if (aVal === undefined || bVal === undefined) {
        return arrA.length - arrB.length;
      } else if (aVal !== bVal) {
        return aVal - bVal;
      }
      i++;
    }
  };

  const sorting3 = (data, left, right) => {
    if (left >= right) {
      return data;
    }

    const temp = data[left];

    let i = left;
    let j = right;

    while (j > i) {
      let differ;
      while (j > i && differ === undefined) {
        differ = compare(temp, data[j]);
        if (differ <= 0) {
          j--;
          differ = undefined;
        }
      }

      data[i] = data[j];

      differ = undefined;

      while (j > i && differ === undefined) {
        differ = compare(temp, data[j]);

        if (differ >= 0) {
          i++;
          differ = undefined;
        }
      }

      data[j] = data[i];
    }

    data[i] = temp;

    let newData = sorting3(data, left, i);
    newData = sorting3(data, i + 1, right);
    console.log(newData);
    return newData;
  };

  return (
    <div>
      <button onClick={sorting}>g1</button>
      <button onClick={sorting2}>go2</button>
      <button onClick={() => sorting3(arr, 0, arr.length - 1)}>go3</button>
      {/* <button onClick={sorting4}>go4</button>? */}
    </div>
  );
};

export default VersionSorting;
