const Index = () => {
  const testingUnique = () => {
    let set = new Set();
    //a,b属于object 值完全相同
    let a: { name: string; age: number } | string = {
      name: "cc",
      age: 28,
    };
    let b = {
      name: "cc",
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

    a = "abc";
    b = {
      name: "cc",
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
      console.log(key, ": ", value);
    });

    console.log(
      " Set.prototype[Symbol.iterator] === Set.prototype.values;",
      Set.prototype[Symbol.iterator] === Set.prototype.values
    );
  };

  // =================================================================

  const weakSetConstructor = () => {
    const arr = [
      [1, 2],
      [3, 4],
    ];
    const weakSet = new WeakSet(arr);
    console.log(weakSet);
  };

  const weakSetFunc = () => {
    let ws = new WeakSet();
    const obj = {};
    const foo = {};

    ws.add(window);
    ws.add(obj);

    ws.has(window); // true
    ws.has(obj); // false

    ws.delete(window); // true
    ws.has(window); // false
  };

  // =================================================================

  const mapExample = () => {
    const set = new Set([
      ["foo", 1],
      ["bar", 2],
    ]);
    const m1 = new Map(set);
    m1.get("foo"); // 1

    const m2 = new Map([["baz", 3]]);
    const m3 = new Map(m2);
    m3.get("baz"); // 3

    new Map().get("asfddfsasadf"); // undefined
  };

  const mapKey = () => {
    const map = new Map();

    map.set(["a"], 555);
    const map1 = map.get(["a"]); // undefined

    let arr = ["aa"];
    map.set(arr, 666);
    const map2 = map.get(arr); // 666

    console.log(map1, "==============", map2);
  };

  const compareObject = () => {
    let map = new Map();
    let s = {
      name: "cc",
      job: "programmer",
    };
    let m = {
      dd: "cdcdcd",
      do: function (str) {
        console.log(str);
      },
    };
    map.set(s, m);
    map.set(m, s);
    map.set(0, s);
    map.set(0, m);
    console.log(map);
  };

  // weakmap =================================================

  const weakMap = () => {
    //weakmap
    let Person = (function () {
      let privateData = new WeakMap();

      function Person(name, age) {
        privateData.set(this, { name: name, age: age });
      }

      Person.prototype.getName = function () {
        return privateData.get(this).name;
      };
      Person.prototype.getAge = function () {
        return privateData.get(this).age;
      };
      Person.prototype.setName = function (name) {
        let obj = privateData.get(this);
        obj.name = name;
      };
      Person.prototype.setAge = function (age) {
        let obj = privateData.get(this);
        obj.age = age;
      };

      return Person;
    })();

    let ssf = new Person("picker", 19);
    console.log(ssf.getName());
    console.log(ssf.getAge());
    ssf.setName("ren");
    ssf.setAge(18);
    console.log(ssf.getName());
    console.log(ssf.getAge());
  };

  return (
    <div>
      <h1>this is base Set Map page</h1>
      <h2>Set</h2>
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
      <h2>WeakSet</h2>
      <button onClick={weakSetConstructor}>weakSet Constructor</button>
      <br />
      <button onClick={weakSetFunc}>weakSet function</button>
      <h2>Map</h2>
      <button onClick={mapExample}>map Example</button>
      <br />
      <button onClick={mapKey}>map Key</button>
      <br />
      <button onClick={compareObject}>compare with object</button>
      <h2>weakMap</h2>
      <button onClick={weakMap}>weakMap</button>
    </div>
  );
};

export default Index;
