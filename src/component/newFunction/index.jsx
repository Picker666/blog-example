const STATE = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected',
};

const PromiseComponent = () => {
  function P(cb) {
    const _this = this;
    _this.currentState = STATE.PENDING;
    _this.value = null;

    _this.fulfilleds = [];
    _this.rejecteds = [];

    _this.resolve = function (value) {
      if (_this.currentState === STATE.PENDING) {
        _this.currentState = STATE.FULFILLED;
        _this.value = value;

        _this.fulfilleds.forEach((item) => {
          item(value);
        });
      }
    };

    _this.reject = function (err) {
      if (_this.currentState === STATE.PENDING) {
        _this.currentState = STATE.REJECTED;
        _this.value = err;
        _this.rejecteds.forEach((item) => {
          item(err);
        });
      }
    };

    cb(_this.resolve, _this.reject);
  }

  const handleNext = function (value, cb, resolve, reject) {
    try {
      const lastResult = cb(value);
      if (lastResult instanceof P) {
        lastResult.then(resolve, reject);
      } else {
        resolve(lastResult);
      }
    } catch (err) {
      reject(err);
    }
  };

  P.prototype.then = function (onFulfilled, onRejected) {
    const _this = this;
    const handleFulfilled =
      typeof onFulfilled === 'function' ? onFulfilled : (val) => val;

    const handleRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (err) => {
            throw err;
          };

    return new P((resolve, reject) => {
      if (_this.currentState === STATE.FULFILLED) {
        handleNext(_this.value, handleFulfilled, resolve, reject);
      }

      if (_this.currentState === STATE.REJECTED) {
        handleNext(_this.value, handleRejected, resolve, reject);
      }

      if (_this.currentState === STATE.PENDING) {
        _this.fulfilleds.push((val) => {
          handleNext(val, handleFulfilled, resolve, reject);
        });

        _this.rejecteds.push((err) => {
          err;
          handleNext(err, handleRejected, resolve, reject);
        });
      }
    });
  };

  //================================================================

  const testing = (MP, lastResolved) =>
    new MP((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.5) {
          resolve('成功了。。。。');
        } else {
          reject('失败了。。。');
        }
      }, 1000);
      // if (Math.random() > 0.1) {
      //   resolve('成功了。。。。');
      // } else {
      //   reject('失败了。。。');
      // }
    })
      .then()
      .then()
      .then(
        (value) => {
          console.log('1、成功', value);
          return value;
        },
        (err) => {
          console.log('1、失败', err);
        }
      )
      .then(
        (value) => {
          console.log('2、成功', value);
        },
        (err) => {
          console.log('2、失败', err);
        }
      )
      .then(
        (value) => {
          console.log('3、成功', value);
          return new MP((resolve, reject) => {
            setTimeout(() => {
              if (Math.random() > 0) {
                resolve('3resolve。。。。');
              } else {
                reject('3reject');
              }
            }, 2000);
          });
        },
        (err) => {
          console.log('3、失败', err);
        }
      )
      .then(
        (value) => {
          console.log('3.1、成功', value);
          return new MP((resolve, reject) => {
            setTimeout(() => {
              if (Math.random() > 0) {
                resolve('3.1resolve。。。。');
              } else {
                reject('3.1reject');
              }
            }, 1000);
          });
        },
        (err) => {
          console.log('3.1、失败', err);
        }
      )
      .then(
        (value) => {
          console.log('4、成功' + value);

          return 9;
        },
        (err) => {
          console.log('4、失败', err);
        }
      )
      // .finally((v) => {
      //   console.log('================================', v);
      //   setTimeout(() => {
      //     console.log('=========倒计时=======================');
      //   }, 1000);
      // })
      // .then(
      //   (v) => {
      //     console.log('=====================vv===========', v);
      //     console.log('测试开始啦!!!=========================================');
      //     return MP.resolve('88');
      //   },
      //   (err) => {
      //     console.log('======================err==========', err);
      //   }
      // )
      // .then((v) => {
      //   console.log(v);
      //   return MP.resolve(
      //     new PM((resolve, reject) => {
      //       setTimeout(() => {
      //         resolve('999');
      //       }, 1000);
      //     })
      //   );
      // })
      .then((v) => {
        console.log('======', v);
        lastResolved && lastResolved();
      });

  const handleClick = () => testing(Promise, () => testing(P));
  // const handleClick1 = () => forRace(Promise, () => forRace(PM));
  // const handleClick2 = () => forAll(Promise, () => forAll(PM));
  // const handleClick3 = () => forAllSettled(Promise, () => forAllSettled(PM));

  Function.prototype.newCall = function (_this, ...rest) {
    const obj = Object.create(_this);
    obj.fn = this;
    const result = obj.fn(...rest);

    return result;
  };

  Function.prototype.newApply = function (_this, rest) {
    const obj = Object.create(_this);
    obj.fn = this;
    const result = obj.fn(...rest);

    return result;
  };

  Function.prototype.newBind = function (_this, ...rest) {
    const obj = Object.create(_this);
    obj.fn = this;

    return (...r) => {
      const result = obj.fn(...rest, ...r);
      return result;
    };
  };

  const add = function (a, b) {
    console.log(this.c);
    return a + b;
  };

  return (
    <div>
      <h1>this is 404 page</h1>
      <button onClick={handleClick}>promise.then执行</button>
      {/* <button onClick={handleClick1}>race执行</button>
      <button onClick={handleClick2}>all执行</button>
      <button onClick={handleClick3}>all settled执行</button> */}
      <button
        onClick={() => {
          const res = add.newCall({ c: 8 }, 1, 2);
          console.log(res);
        }}
      >
        newcall
      </button>
      <button
        onClick={() => {
          const res = add.newApply({ c: 8 }, [1, 2]);
          console.log(res);
        }}
      >
        newapply
      </button>
      <button
        onClick={() => {
          const addbind = add.newBind({ c: 8 }, 1);
          const result = addbind(2);
          console.log(result);
        }}
      >
        newbind
      </button>
    </div>
  );
};

export default PromiseComponent;
