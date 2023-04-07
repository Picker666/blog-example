const Index = () => {
  const eventLoopTest = () => {
    setTimeout(() => {
      console.log("setTimeout1000==========");
    }, 1000);

    setTimeout(() => {
      console.log("setTimeout0==========");
    }, 0);

    new Promise((resolve, reject) => {
      console.log("Promise=========");
      resolve("success======");
    })
      .then((res) => {
        console.log("resolve=========");
        return Promise.reject("reject======");
      })
      .catch((err) => {
        console.log(err);
      });

    console.log("start========");
  };

  const test = () => {
    console.log("script start");

    const promiseA = new Promise((resolve, reject) => {
      console.log("init promiseA");
      resolve("promiseA");
    });

    const promiseB = new Promise((resolve, reject) => {
      console.log("init promiseB");
      resolve("promiseB");
    });

    setTimeout(() => {
      console.log("setTimeout run");
      promiseB.then((res) => {
        console.log("promiseB res :>> ", res);
      });
      console.log("setTimeout end");
    }, 500);

    promiseA.then((res) => {
      console.log("promiseA res :>> ", res);
    });

    queueMicrotask(() => {
      console.log("queue Microtask run");
    });

    console.log("script end");

    // script start
    // init promiseA
    // init promiseB
    // script end
    // promiseA res :>>  promiseA
    // queue Microtask run
    // setTimeout run
    // setTimeout endtest
    // promiseB res :>>  promiseB
  };

  const test2 = () => {
    console.log("script start");

    async function async1() {
      await async2();
      console.log("async1 end");
    }
    async function async2() {
      console.log("async2 end");
    }
    async1();

    setTimeout(function () {
      console.log("setTimeout");
    }, 0);

    new Promise((resolve) => {
      console.log("Promise");
      resolve(66);
    })
      .then(function () {
        console.log("promise1");
      })
      .then(function () {
        console.log("promise2");
      });
  };

  return (
    <div>
      <h1>this is base index page</h1>
      <button onClick={eventLoopTest}>event Loop Test</button>
      <button onClick={test}>test</button>
      <button onClick={test2}>test2</button>
    </div>
  );
};

export default Index;
