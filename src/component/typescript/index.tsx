const TypescriptBase = () => {
    // 八种内置类型
    const str = 'hdfasdf'; // const str: "hdfasdf"
    let str1 = 'fasd'; // let str1: string

    const arr = [1, 2] as const // const arr: readonly [1, 2]
    let arr1 = [1, 'ooo']; // let arr1: (string | number)[]

    let obj: object = {name: 'picker'}

    // ----------------------------------------------------------------

    // number 和 bigint
    let big: bigint = 100n;
    let num: number = 6;
    big = num //Type 'number' is not assignable to type 'bigint'.(2322)
    num = big //Type 'bigint' is not assignable to type 'number'.(2322)

    // ----------------------------------------------------------------

    //null和undefined
    let str2: string = 'hi'
    str2 = null
    str2 = undefined

    // null和undefined赋值给number
    let num1:number = 520;
    num1 = null
    num1 = undefined

    // null和undefined赋值给object
    let obj1:object ={};
    obj1 = null
    obj1 = undefined

    // null和undefined赋值给Symbol
    let sym: symbol = Symbol("me"); 
    sym = null
    sym = undefined

    // null和undefined赋值给boolean
    let isDone: boolean = false;
    isDone = null
    isDone= undefined

    // null和undefined赋值给bigint
    let big1: bigint =  100n;
    big1 = null
    big1 = undefined

    let void1: void;
    let null1: null = null;
    let undefined1: undefined = undefined;
    let void2: void;
    let any1: any = null
    let any2: any = undefined

    void1 = null1; //Type 'null' is not assignable to type 'void'.(2322)
    void1 = undefined1;
    void1 = void2;

    // ----------------------------------------------------------------
    // void
    let a: void; 
    let b: number = a; //Type 'void' is not assignable to type 'number'.(2322)
    let aa: any = a;
    // num1 = a

    // A function whose declared type is neither 'void' nor 'any' must return a value.
    function add(): undefined {
        console.log('hello')
    }

    return <div>this is TypescriptBase page</div>
  }
  
  export default TypescriptBase
  