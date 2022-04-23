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
    console.log(arr, '============');
  };
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
