const Index = () => {
  const withObject = (arr: number[]) => {
    let newArray = [arr[0]];
    for (let i of Object.keys(arr)) {
      const value1 = arr[i];
      let repeat = false;

      for (let j of Object.keys(arr)) {
        const vales2 = newArray[j];

        if (value1 === vales2) {
          repeat = true;
          break;
        }
      }
      if (!repeat) {
        newArray.push(value1);
      }
    }
    console.log(newArray, "=======================");
  };

  const withObject2 = (arr: number[]) => {
    let newArray = [arr[0]];
    let obj = {
      [arr[0]]: true,
    };
    for (let i of Object.keys(arr)) {
      const value1 = arr[i];

      if (obj[value1] === undefined) {
        newArray.push(value1);
        obj[value1] = true;
      }
    }
    console.log(newArray, "=======================");
  };

  return (
    <div>
      <h1>this is base Set Map page</h1>
      <button
        onClick={() => {
          withObject([0, 2, 1, 5, 6, 5, 4, 3, 4, 5, 6, 5, 4, 6]);
        }}
      >
        withObject
      </button>

      <button
        onClick={() => {
          withObject2([0, 2, 1, 5, 6, 5, 4, 3, 4, 5, 6, 5, 4, 6]);
        }}
      >
        with Object2
      </button>
    </div>
  );
};

export default Index;
