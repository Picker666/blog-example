const Index = () => {
  const eventLoopTest = () => {
    setTimeout(() => {
      console.log('setTimeout1000==========');
    }, 1000);

    setTimeout(() => {
      console.log('setTimeout0==========');
    }, 0);

    new Promise((resolve, reject) => {
      console.log('Promise=========');
      resolve('success======');
    })
      .then((res) => {
        console.log('resolve=========');
        return Promise.reject('reject======');
      })
      .catch((err) => {
        console.log(err);
      });

    console.log('start========');
  };

  const test = () => {
    console.log('script start');

    const promiseA = new Promise((resolve, reject) => {
      console.log('init promiseA');
      resolve('promiseA');
    });

    const promiseB = new Promise((resolve, reject) => {
      console.log('init promiseB');
      resolve('promiseB');
    });

    setTimeout(() => {
      console.log('setTimeout run');
      promiseB.then((res) => {
        console.log('promiseB res :>> ', res);
      });
      console.log('setTimeout end');
    }, 500);

    promiseA.then((res) => {
      console.log('promiseA res :>> ', res);
    });

    queueMicrotask(() => {
      console.log('queue Microtask run');
    });

    console.log('script end');

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
    console.log('script start');

    async function async1() {
      await async2();
      console.log('async1 end');
    }
    async function async2() {
      console.log('async2 end');
    }
    async1();

    setTimeout(function () {
      console.log('setTimeout');
    }, 0);

    new Promise((resolve) => {
      console.log('Promise');
      resolve(66);
    })
      .then(function () {
        console.log('promise1');
      })
      .then(function () {
        console.log('promise2');
      });
  };

  const temp = async (i) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(i * 2);
      }, 1000);
    });
  };

  const func = function () {
    // const arr = [1, 2, 3];
    // arr.forEach(async (item) => {
    //   const res = await temp(item);
    //   console.log(res, '=====');
    // });

    setTimeout(() => {
      console.log(22);
    }, 3000);
    setTimeout(() => {
      console.log(111);
    }, 1000);
    console.time();
    for (let i = 0; i < 1000000000; ) {
      i++;
    }
    console.timeEnd();
  };

  const func2 = () => {
    console.log('1');

    setTimeout(function () {
      console.log('2');
      // process.nextTick(function () {
      //   console.log('3');
      // });
      new Promise<void>(function (resolve) {
        console.log('4');
        resolve();
      }).then(function () {
        console.log('5');
      });
    }, 1000);
    // process.nextTick(function () {
    //   console.log('6');
    // });
    new Promise<void>(function (resolve) {
      console.log('7');
      resolve();
    }).then(function () {
      console.log('8');
    });

    setTimeout(function () {
      console.log('9');
      // process.nextTick(function () {
      //   console.log('10');
      // });
      new Promise<void>(function (resolve) {
        console.log('11');
        resolve();
      }).then(function () {
        console.log('12');
      });
    });

    // 1768 2435 9 11 10 12
  };

  const func3 = () => {
    async function async1() {
      console.log('async1 start===2');
      await async2();
      console.log('async1 end===6');
    }
    async function async2() {
      console.log('async2===3');
    }
    console.log('script start===1');
    setTimeout(function () {
      console.log('setTimeout==8');
    }, 0);
    async1();
    new Promise<void>(function (resolve) {
      console.log('promise1===4');
      resolve();
    }).then(function () {
      console.log('promise2===7');
    });
    console.log('script end===5');
  };

  const func4 = () => {
    async function async1() {
      console.log('async1 start===2');
      await async2();
      console.log('async1 end===7');
    }
    async function async2() {
      console.log('async2===3');
      new Promise((resolve, reject) => {
        console.log('promise0===4');
        setTimeout(() => {
          console.log('async2 promise===10');
        }, 0);
      });
    }
    console.log('script start===1');
    setTimeout(function () {
      console.log('setTimeout=== 9');
    }, 0);
    async1();
    new Promise<void>(function (resolve) {
      console.log('promise1====5');
      resolve();
    }).then(function () {
      console.log('promise2===8');
    });
  };

  return (
    <div>
      <h1>this is base index page</h1>
      <button onClick={eventLoopTest}>event Loop Test</button>
      <button onClick={test}>test</button>
      <button onClick={test2}>test2</button>
      <button onClick={func}>timeout</button>
      <button onClick={func2}>goo</button>
      <button onClick={func3}>goo2</button>
      <button onClick={func4}>goo4</button>
    </div>
  );
};

export default Index;
