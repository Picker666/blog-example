const AsyncAwait = () => {
  function* initial() {
    yield '第一个';
    yield '第二个';
    yield '第三个';
  }

  const handleClick = (generatorFn) => {
    const fn = generatorFn();
    const f1 = fn.next();
    console.log('f1: ', f1);
    const f2 = fn.next();
    console.log('f2: ', f2);
    const f3 = fn.next();
    console.log('f3: ', f3);
    const f4 = fn.next();
    console.log('f4: ', f4);
  };

  //=====================================

  function* goOn() {
    const res1 = yield '第一个';
    console.log('res1: ', res1);
    const res2 = yield '第二个';
    console.log('res2: ', res2);
    const res3 = yield '第三个';
    console.log('res3: ', res3);
  }

  const handleClickGoOn = (generatorFn) => {
    const fn = generatorFn();
    const f1 = fn.next('res1');
    console.log('f1: ', f1);
    const f2 = fn.next('res2');
    console.log('f2: ', f2);
    const f3 = fn.next('res3');
    console.log('f3: ', f3);
    const f4 = fn.next('res4');
    console.log('f4: ', f4);
  };

  //=====================================

  function awaitFn(backData) {
    return function (callBack) {
      setTimeout(() => {
        callBack(++backData);
      }, 1000);
    };
  }

  function* asyncFn() {
    let res = yield awaitFn(0);
    console.log(res, '第1次');
    res = yield awaitFn(res);
    console.log(res, '第2次');
    res = yield awaitFn(res);
    console.log(res, '第3次');
    res = yield awaitFn(res);
    console.log(res, '第4次');
  }

  function handleClickAsyncAwait(fn) {
    const f = fn();
    function next(data?: unknown) {
      const res = f.next(data);
      if (res.done) return res.value;
      res.value((backData) => {
        next(backData);
      });
    }
    next();
  }

  // =================================================================

  function fn(a, b) {
    console.log('fn..');
    return a + b;
  }
  function* gen(x) {
    console.log(x);
    const y = yield fn(x, 100) + 3;
    console.log(y);
    return 200;
  }

  const handleClick1 = () => {
    const g = gen(1);
    const g1 = g.next();
    console.log(g1);
    const g2 = g.next();
    console.log(g2);
  };

  const auto = (gen, initValue) => {
    const g = gen(initValue);

    const goOn = (value?: unknown) => {
      const gResult = g.next(value);

      if (gResult.done) {
        return gResult.value;
      }
      return goOn(gResult.value);
    };

    return goOn();
  };

  // ===

  const asyncFn1 = function (val?: number) {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(666 + val), 1000);
    });
  };

  const handleasyncFn1 = async function () {
    const value = await asyncFn1();
    console.log('value: ', value);
    const value1 = await asyncFn1(9);
    console.log('value1: ', value1);
  };

  // --

  function MyAsync(func) {
    // async 关键字的转化
    return function (...rest) {
      const next = (result, resolve, reject, value) => {
        const res = result.next(value);
        if (res.done) {
          return resolve(res.value);
        } else {
          return Promise.resolve(res.value).then(
            (val) => {
              next(result, resolve, reject, val);
            },
            (err) => {
              reject(err);
            }
          );
        }
      };
      return new Promise((resolve, reject) => {
        const result = func(...rest);
        next(result, resolve, reject, undefined);
      });
    };
  }

  function* generatorF() {
    const value = yield asyncFn1();
    console.log('value: ', value);
    const value1 = yield asyncFn1(9);
    console.log('value1: ', value1);
  }

  const handleasyncSelf = () => {
    MyAsync(generatorF)();
  };

  return (
    <div>
      <button onClick={() => handleClick(initial)}>执行 initial</button>
      <button onClick={() => handleClickGoOn(goOn)}>执行goOn</button>
      <button onClick={() => handleClickAsyncAwait(asyncFn)}>执行AsyncAwait</button>
      <button onClick={handleClick1}>执行1</button>
      <button onClick={() => console.log(auto(gen, 1))}>执行1 auto</button>
      <button onClick={handleasyncFn1}>执行2 auto</button>
      <button onClick={handleasyncSelf}>执行 self</button>
    </div>
  );
};

export default AsyncAwait;
