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

  return <div>this is Typescript advanced page</div>;
};

export default TypescriptBase;
