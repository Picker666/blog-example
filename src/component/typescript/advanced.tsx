const TypescriptBase = () => {
  //
  let str = "this is picker string";
  str = undefined;
  str = 9;
  str = null;

  let strFun = (name = "picker666") => console.log(name, "=====");
  strFun();
  strFun(null);

  const name: "picker" = "picker";
  let anotherName = name;
  anotherName = "picker666";

  let names: "picker6" = "picker6";

  let x = null; // 类型拓宽成 any
  let y = undefined; // 类型拓宽成 any

  /** -----分界线------- */
  const z = null; // 类型是 null
  const w = undefined; // 类型是 undefined

  /** -----分界线------- */
  let anyFun = (param = null) => param; // 形参类型是 null let anyFun: (param?: null) => null
  let z2 = z; // 类型是 null
  let x2 = x; // 类型是 null
  let y2 = y; // 类型是 undefined

  const nul: null = null; // null
  let nul2 = nul; // null

  let nul1: null = null;
  let nul11 = nul1; //null

  let xx = "picker";
  xx = "picker6";
  xx = "picker666";

  const obj = {
    x: 1,
  };

  obj.x = 6; // OK
  // Type '"6"' is not assignable to type 'number'.
  obj.x = "6"; // Error
  // Property 'y' does not exist on type '{ x: number; }'.
  obj.y = 8; // Error
  // Property 'name' does not exist on type '{ x: number; }'.
  obj.name = "picker"; // Error

  const obj1: { x: 1 | 3 | 5 } = {
    x: 1,
  };

  const obj11 = {
    x: 1,
    y: 2,
  };
  // Type is { x: 1; y: number; }
  const obj2 = {
    x: 1 as const,
    y: 2,
  };
  // Type is { readonly x: 1; readonly y: 2; }
  const obj3 = {
    x: 1,
    y: 2,
  } as const;

  function foo(x?: number | string | null) {
    if (!x) {
      x; // Type is string | number | null | undefined
    }
  }

  let a: number[] = [1, 2, 3, 4];
  let ro: ReadonlyArray<number> = a;
  ro[0] = 12; // error! 类型“readonly number[]”中的索引签名仅允许读取。
  ro.push(5); // error! 类型“readonly number[]”上不存在属性“push”。
  ro.length = 100; // error! 无法分配到 "length" ，因为它是只读属性。ts(2540)
  a = ro; // error! 类型 "readonly number[]" 为 "readonly"，不能分配给可变类型 "number[]"。ts(4104)

  let a1: number[] = [1, 2, 3, 4];
  let ro1: Array<number> = a1;
  ro1[0] = 12;
  ro1.push(5);
  ro1.length = 100;
  a1 = ro1;

  interface Person {
    name: string;
    age?: number;
    [propName: string]: string;
  }

  let tom: Person = {
    name: "Tom",
    age: 25,
    gender: "male",
  };

  interface LabeledValue {
    label: string;
  }
  function printLabel(labeledObj: LabeledValue) {
    console.log(labeledObj.label);
  }
  let myObj = { size: 10, label: "Size 10 Object" };
  printLabel(myObj); // OK

  printLabel({ size: 10, label: "Size 10 Object" }); // Error

  function trace<T>(arg: T): T {
    console.log(arg.size); // Error: Property 'size doesn't exist on type 'T'
    return arg;
  }

  interface Persons {
    name: string;
    age: number;
  }
  const sem: Persons = { name: "semlinker", age: 30 };
  type Sem = typeof sem; // type Sem = Person
  console.log();

  function prop0(obj: object, key: string) {
    return obj[key];
  }

  type Todo = {
    id: number;
    text: string;
    done: boolean;
  };

  const todo: Todo = {
    id: 1,
    text: "Learn TypeScript keyof",
    done: false,
  };

  function prop<T extends object, K extends keyof T>(obj: T, key: K) {
    return obj[key];
  }

  const id = prop(todo, "id"); // const id: number
  const text = prop(todo, "text"); // const text: string
  const done = prop(todo, "done"); // const done: boolean
  const date = prop(todo, "date"); // 类型“"date"”的参数不能赋给类型“keyof Todo”的参数。 ts(2345)

  let person = {
    name: "musion",
    age: 35,
  };

  function getValues<T, K extends keyof T>(person: T, keys: K[]) {
    return keys.map((key) => person[key]);
  }

  console.log(getValues(person, ["name", "age"])); // ['musion', 35]
  console.log(getValues(person, ["gender"])); // [undefined]

  return <div>this is Typescript advanced page</div>;
};

export default TypescriptBase;
