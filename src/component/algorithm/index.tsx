const Testing = () => {
  // 冒泡
  function sorting1(arr: number[]) {
    const len = arr.length;
    let changed = true;
    for (let i = 0; i < len && changed; i++) {
      changed = false;
      for (let j = 0; j < len - i; j++) {
        if (arr[j] > arr[j + 1]) {
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          changed = true;
        }
      }
      console.log(i, '========');
    }

    console.log(arr);
  }

  // 选择排序
  const sorting2 = (arr: number[]) => {
    const len = arr.length;

    for (let i = 0; i < len - 1; i++) {
      for (let j = i + 1; j < len; j++) {
        const current = arr[i];
        if (current > arr[j]) {
          arr[i] = arr[j];
          arr[j] = current;
        }
      }
      console.log(i, '========');
    }

    console.log(arr);
  };

  // 插入排序
  const sorting3 = (arr: number[]) => {
    const len = arr.length;

    for (let i = 1; i < len; i++) {
      const newItem = arr[i];
      let j = i - 1;
      for (; j >= 0 && arr[j] > newItem; j--) {
        arr[j + 1] = arr[j];
      }
      arr[j + 1] = newItem;
    }
    console.log(arr);
  };

  // 二路归并
  const sorting4 = (arr: number[], left: number, right: number) => {
    if (right === left) {
      return arr;
    }

    const mid = Math.floor((right + left) / 2);

    const arrLeft: number[] = sorting4(arr, left, mid);
    const arrRight: number[] = sorting4(arr, mid + 1, right);

    const mergedArr: number[] = [];

    let i = left;
    let j = mid + 1;
    let p = left;
    while (i <= mid || j <= right) {
      if (i > mid) {
        mergedArr[p++] = arrRight[j++];
      } else if (j > right) {
        mergedArr[p++] = arrLeft[i++];
      } else if (arrLeft[i] > arrRight[j]) {
        mergedArr[p++] = arrRight[j++];
      } else {
        mergedArr[p++] = arrLeft[i++];
      }
    }

    for (let k = left; k <= right; k++) {
      arr[k] = mergedArr[k];
    }

    console.log(arr, '===========================');
    return arr;
  };

  // 快速排序
  const sorting5 = (arr: number[], left: number, right: number): number[] => {
    if (left >= right) {
      return arr;
    }
    let i = left;
    let j = right;
    const current = arr[i];

    while (j > i) {
      if (j > i && current <= arr[j]) {
        j--;
      }
      arr[i] = arr[j];

      if (j > i && current >= arr[i]) {
        i++;
      }
      arr[j] = arr[i];
    }

    arr[i] = current;

    let formatArr = sorting5(arr, left, i);
    formatArr = sorting5(formatArr, i + 1, right);

    console.log(formatArr);
    return formatArr;
  };

  return (
    <div>
      <h1>this is algorithm home page</h1>
      <button onClick={() => sorting1([12, 3, 5, 74, 2, 8, 90, 0, -90])}>
        sorting1
      </button>
      <button onClick={() => sorting2([12, 3, 5, 74, 2, 8, 90, 0, -90])}>
        选择排序
      </button>
      <button onClick={() => sorting3([12, 3, 5, 74, 2, 8, 90, 0, -90])}>
        插入排序
      </button>

      <button onClick={() => sorting4([12, 3, 5, 74, 2, 8, 90, 0, -90], 0, 8)}>
        二路归并排序
      </button>

      <button onClick={() => sorting5([12, 3, 5, 74, 2, 8, 90, 0, -90], 0, 8)}>
        快速排序
      </button>
    </div>
  );
};

export default Testing;
