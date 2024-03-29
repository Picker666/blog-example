const InterviewIndex = () => {
  const objWithArray = () => {
    var obj = {
      "6": 3,
      "1": 5,
      "2": 2,
      length: 2,
      splice: Array.prototype.splice,
      push: Array.prototype.push,
    };
    obj.push(-6);
    obj.push(0);
    obj.push(6);
    obj.push(66);
    obj.push(666);
    console.log(obj);
  };

  const OperationPriority = () => {
    var a = { n: 1 };
    var b = a;
    a.x = a = { n: 2 };
    console.log(a, "====", b);
  };

  const forAndForEach = (arrLength: number) => {
    let arr = new Array(arrLength);

    console.time(`arrLength=${arrLength} for`);
    for (let i = 0; i < arrLength; i++) {}
    console.timeEnd(`arrLength=${arrLength} for`);

    console.time(`arrLength=${arrLength} forEach`);
    arr.forEach((a) => {});
    console.timeEnd(`arrLength=${arrLength} forEach`);
  };

  const arrayInsertTime = () => {
    console.time("======array create");
    let arr = new Array(10000000);
    for (var i = 0; i < 10000000; i++) {
      arr[i] = i;
    }
    console.timeEnd("======array create");

    console.time("======array1 create");
    let arr1 = new Array(10000000);
    arr1.push([{ a: 1 }]);
    for (var i = 0; i < 10000000; i++) {
      arr1[i] = i;
    }
    console.timeEnd("======array1 create");

    console.log(arr.length, arr1.length);

    console.time("arr======0");
    arr[0];
    console.timeEnd("arr======0");

    console.time("arr1======0");
    arr1[0];
    console.timeEnd("arr1======0");

    console.time("arr-------10000000");
    arr[10000000];
    console.timeEnd("arr-------10000000");

    console.time("arr1-------10000000");
    arr1[10000000];
    console.timeEnd("arr1-------10000000");
  };

  const arrayReadTime = () => {
    let a;
    console.time("======array create");
    let arr = new Array(10000000);
    for (var i = 0; i < 10000000; i++) {
      a = arr[i];
    }
    console.timeEnd("======array create");

    let a1;
    console.time("======array1 create");
    let arr1 = new Array(10000000);
    arr1.push([{ a: 1 }]);
    for (var i = 0; i < 10000000; i++) {
      a1 = arr1[i];
    }
    console.timeEnd("======array1 create");

    console.log(arr.length, arr1.length);
  };

  return (
    <div>
      <h1>this is interview index page</h1>
      <button onClick={objWithArray}>object With Array</button>
      <br />
      <button onClick={OperationPriority}>Operation Priority</button>
      <br />
      <button
        onClick={() => {
          forAndForEach(100000);
        }}
      >
        for And ForEach 100000
      </button>
      <button
        onClick={() => {
          forAndForEach(1000000);
        }}
      >
        for And ForEach 1000000
      </button>
      <button
        onClick={() => {
          forAndForEach(10000000);
        }}
      >
        for And ForEach 10000000
      </button>
      <button
        onClick={() => {
          forAndForEach(100000000);
        }}
      >
        for And ForEach 100000000
      </button>
      <br />
      <button onClick={arrayInsertTime}>array Insert Time</button>
      <br />
      <button onClick={arrayReadTime}>array Read Time</button>
      <br />
    </div>
  );
};

export default InterviewIndex;
