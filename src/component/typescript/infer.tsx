const Infer = () => {
  interface Fish {
    fish: string;
  }
  interface Water {
    water: string;
  }
  interface Bird {
    bird: string;
  }
  interface Sky {
    sky: string;
  }
  //naked type
  type Condition<T> = T extends Fish ? Water : Sky;

  // let condition1: Condition<Fish | Bird> = { water: "水" };
  // let condition2: Condition<Fish | Bird> = { sky: "天空" };
  let condition1: Water | Sky = { water: "水" };
  let condition2: Water | Sky = { sky: "天空" };

  type Diff<T, U> = T extends U ? never : T;
  type R = Diff<"a" | "b" | "c" | "d", "a" | "c" | "f">; // "b" | "d"

  type Filter<T, U> = T extends U ? T : never;
  type R1 = Filter<string | number | boolean, number>; //

  type ReturnType<T extends (...args: any[]) => any> = T extends (
    ...args: any[]
  ) => infer R
    ? R
    : any;

  type E = ReturnType<() => void>;

  type Parameters<T> = T extends (...args: infer R) => any ? R : any;
  type T0 = Parameters<() => string>; // []
  type T1 = Parameters<(s: string) => void>; // [string]
  type T2 = Parameters<<T>(arg: T) => T>; // [unknown]

  const t0: T0 = [];
  const t1: T1 = ["a", "3a"];
  const t2: T2 = [""];

  type Parameters1<T, R extends Array<any>> = T extends (...args: R) => any
    ? R
    : any;
  type T01 = Parameters1<() => string, Array<any>>;
  const t01: T01 = ["string", "string12"];

  type T11 = { name: string };
  type T22 = { age: number };

  type UnionToInterp<T> = T extends {
    a: (x: infer U) => void;
    b: (x: infer U) => void;
  }
    ? U
    : never;
  type T3 = UnionToInterp<{ a: (x: T11) => void; b: (x: T22) => void }>; // T1 & T2

  // =================================================================================================
  interface Action<T> {
    payload?: T;
    type: string;
  }

  class EffectModule {
    count = 1;
    message = "hello!";

    delay(input: Promise<number>) {
      return input.then((i) => ({
        payload: `hello ${i}!`,
        type: "delay",
      }));
    }

    setMessage(action: Action<Date>) {
      return {
        payload: action.payload!.getMilliseconds(),
        type: "set-message",
      };
    }
  }

  // 修改 Connect 的类型，让 connected 的类型变成预期的类型
  type Connect = (module: EffectModule) => {
    delay(input: number): Action<string>;
    setMessage(action: Date): Action<number>;
  };

  const connect: Connect = (m) => ({
    delay: (input: number) => ({
      type: "delay",
      payload: `hello 2`,
    }),
    setMessage: (input: Date) => ({
      type: "set-message",
      payload: input.getMilliseconds(),
    }),
  });

  type Connected = {
    delay(input: number): Action<string>;
    setMessage(action: Date): Action<number>;
  };

  const connected: Connected = connect(new EffectModule());

  return <div>this is infer </div>;
};

export default Infer;
