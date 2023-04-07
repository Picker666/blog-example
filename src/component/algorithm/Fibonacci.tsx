const Home = () => {
  //斐波那契数列就是形如0,1,1,2,3,5,8.....的数列。
  const fibonacci = (n) => {
    const arr: number[] = [];
    for (let i = 0; i < n; i++) {
      if (i <= 1) {
        arr.push(i);
      } else {
        arr.push(arr[i - 1] + arr[i - 2]);
      }
    }
    console.log(arr, "============");
  };

  const MySort = (arr, start, end) => {
    if (start >= end) {
      return arr;
    }

    const base = arr[start];
    let i = end,
      j = start;
    while (i > j) {
      while (i > j && arr[i] >= base) {
        i--;
      }
      arr[start] = arr[i];

      while (i > j && arr[j] < base) {
        j++;
      }
      arr[i] = arr[j];
    }
    arr[j] = base;

    let formatArr: number[] = MySort(arr, start, i);
    formatArr = MySort(formatArr, i + 1, end);

    return formatArr;
  };

  console.log(MySort([5, 2, 3, 1, 4], 0, 4));
  return (
    <div>
      <h1>this is Fibonacci page</h1>
      <button
        onClick={() => {
          fibonacci(9);
        }}
      >
        Fibonacci
      </button>
    </div>
  );
};

export default Home;
