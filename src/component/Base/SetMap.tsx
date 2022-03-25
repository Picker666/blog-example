const Index = () => {
  const testingUnique = () => {
    let set = new Set();
    //a,b属于object 值完全相同
    let a: { name: string; age: number } | string = {
      name: 'cc',
      age: 28,
    };
    let b = {
      name: 'cc',
      age: 28,
    };

    //d,f属于number类型 值完全相同
    //c,f 属于Date类型，值相同
    let c = new Date(),
      d = 0,
      f = 0,
      e = c,
      g = new Date();

    set.add(a);
    set.add(b);
    set.add(c);
    set.add(d);
    set.add(e);
    set.add(f);
    set.add(g);

    a = 'abc';
    b = {
      name: 'cc',
      age: 30,
    };
    set.add(a);
    set.add(b);

    console.log(set);
  };

  const removeDuplicate = () => {
    const array = [1, 2, 3, 4, 4, 1, 2, 3, 2];
    const mySet = new Set(array);
    const newArray = [...mySet]; // [1, 2, 3, 4]
    console.log(newArray);
  };

  const mergeArr = () => {
    let arrayA = [2, 3, 4, 5, 6],
      arrayB = [3, 4, 5, 6, 7, 8];
    let setAB = new Set([...arrayA, ...arrayB]);
    let newArrayAB = [...setAB];
    console.log(newArrayAB); //[2,3,4,5,6,7,8]
  };
  const commonArr = () => {
    let arrayA = [2, 3, 4, 5, 6],
      arrayC = [2, 3, 4, 5, 6],
      arrayD = [3, 4, 5, 6, 7, 8];
    let setC = new Set(arrayC);
    let setD = new Set(arrayD);
    let newArrayC_D = arrayA.filter((x) => setD.has(x));
    console.log(newArrayC_D); //[3,4,5,6]
  };
  const differenceArr = () => {
    let arrayA = [2, 3, 4, 5, 6],
      arrayB = [3, 4, 5, 6, 7, 8],
      arrayC = [2, 3, 4, 5, 6],
      arrayD = [3, 4, 5, 6, 7, 8];
    let setC = new Set(arrayC);
    let setD = new Set(arrayD);
    let newArrayD_C = arrayA.filter((x) => !setD.has(x));
    let newArrayD_D = arrayB.filter((x) => !setC.has(x));
    let newArrayCD = [...newArrayD_C, ...newArrayD_D];
    console.log(newArrayCD); //[2,7,8]
  };

  const printSet = () => {
    let set = new Set([1, 2, 8]);
    console.log(set.keys());
    console.log(set.values());
    console.log(set.entries());

    set.forEach((value, key) => {
      console.log(key, ': ', value);
    });

    console.log(
      ' Set.prototype[Symbol.iterator] === Set.prototype.values;',
      Set.prototype[Symbol.iterator] === Set.prototype.values
    );
  };

  return (
    <div>
      <h1>this is base Set Map page</h1>
      <button onClick={testingUnique}>唯一性</button>
      <br />
      <button onClick={removeDuplicate}>去重</button>
      <br />
      <button onClick={mergeArr}>求并集</button>
      <br />
      <button onClick={removeDuplicate}>求交集</button>
      <br />
      <button onClick={differenceArr}>求差集</button>
      <br />
      <button onClick={printSet}>printSet</button>
    </div>
  );
};

export default Index;
