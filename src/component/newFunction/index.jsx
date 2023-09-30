const STATE = {
  PENDING: "pending",
  FULFILLED: "fulfilled",
  REJECTED: "rejected",
};

const PromiseComponent = () => {
  function NewPromise(callback) {
    const _this = this;
    _this.value;
    _this.reason;
    _this.status = STATE.PENDING;

    _this.resolveCallback = [];
    _this.rejectCallback = [];

    const resolve = (val) => {
      setTimeout(() => {
        if (_this.status === STATE.PENDING) {
          _this.status = STATE.FULFILLED;
          _this.value = val;
          _this.resolveCallback.forEach((cb) => cb(val));
        }
      });
    };

    const reject = (err) => {
      setTimeout(() => {
        if (_this.status === STATE.PENDING) {
          _this.status = STATE.REJECTED;
          _this.reasons = err;
          _this.rejectCallback.forEach((cb) => cb(err));
        }
      });
    };

    callback(resolve, reject);
  }

  const generateCallback = (value, callback, resolve, reject) => {
    try {
      const val = callback(value);
      if (val instanceof NewPromise) {
        val.then(resolve, reject);
      } else {
        resolve(val);
      }
    } catch (err) {
      reject(err);
    }
  };

  NewPromise.prototype.then = function (fulfill, reject) {
    let fulfillCallback = fulfill;
    if (typeof fulfill !== "function") {
      fulfillCallback = (val) => val;
    }

    let rejectCallback = reject;
    if (typeof reject !== "function") {
      rejectCallback = (err) => {
        throw new Error(err);
      };
    }

    if (this.status === STATE.FULFILLED) {
      const promise = new NewPromise((resolve, reject) => {
        this.resolveCallback.push((val) => {
          generateCallback(val, fulfillCallback, resolve, reject);
        });
      });
      return promise;
    }

    if (this.status === STATE.REJECTED) {
      const promise = new NewPromise((resolve, reject) => {
        this.rejectCallback.push((reason) => {
          generateCallback(reason, rejectCallback, resolve, reject);
        });
      });
      return promise;
    }

    if (this.status === STATE.PENDING) {
      const promise = new NewPromise((resolve, reject) => {
        this.resolveCallback.push((val) => {
          generateCallback(val, fulfillCallback, resolve, reject);
        });

        this.rejectCallback.push((reason) => {
          generateCallback(reason, rejectCallback, resolve, reject);
        });
      });

      return promise;
    }
  };

  NewPromise.resolve = function (val) {
    if (val instanceof NewPromise) {
      return val;
    }
    return new NewPromise((resolve, reject) => {
      resolve(val);
    });
  };

  const testing = (MP, lastResolved) =>
    new MP((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.5) {
          resolve("成功了。。。。");
        } else {
          reject("失败了。。。");
        }
      }, 1000);
      // if (Math.random() > 0.1) {
      //   resolve('成功了。。。。');
      // } else {
      //   reject('失败了。。。');
      // }
    })
      // .then()
      .then()
      .then(
        (value) => {
          console.log("1、成功", value);
          // return value;
          return new MP((resolve, reject) => {
            setTimeout(() => {
              if (Math.random() > 1) {
                resolve("0成功了。。。。");
              } else {
                reject("0失败了。。。");
              }
            }, 1000);
          });
        },
        (err) => {
          console.log("1、失败", err);
        }
      )
      .then(
        (value) => {
          console.log("2、成功", value);
        },
        (err) => {
          console.log("2、失败", err);
        }
      )
      .then(
        (value) => {
          console.log("3、成功", value);
          return new MP((resolve, reject) => {
            setTimeout(() => {
              if (Math.random() > 0) {
                resolve("3resolve。。。。");
              } else {
                reject("3reject");
              }
            }, 2000);
          });
        },
        (err) => {
          console.log("3、失败", err);
        }
      )
      .then(
        (value) => {
          console.log("3.1、成功", value);
          return new MP((resolve, reject) => {
            setTimeout(() => {
              if (Math.random() > 0) {
                resolve("3.1resolve。。。。");
              } else {
                reject("3.1reject");
              }
            }, 1000);
          });
        },
        (err) => {
          console.log("3.1、失败", err);
        }
      )
      .then(
        (value) => {
          console.log("4、成功" + value);

          return 9;
        },
        (err) => {
          console.log("4、失败", err);
        }
      )
      .then((v) => {
        console.log("======", v);
        lastResolved && lastResolved();
      });

  const testing2 = (MP, lastResolved) => {
    MP.resolve(0)
      .then((v) => {
        console.log(0);
        return MP.resolve(4);
      })
      .then((res) => {
        console.log(res);
      });
    console.log("start ======");

    MP.resolve(1)
      .then((v) => {
        console.log(1);
        return 2;
      })
      .then((v) => {
        console.log(2);
        return 3;
      })
      .then((v) => {
        console.log(3);
        return 5;
      })
      .then((v) => {
        console.log(5);
        return 6;
      })
      .then((v) => {
        console.log(6);

        lastResolved && lastResolved();
      });
  };

  const handleClick = () => {
    // testing(Promise, () => testing(NewPromise));
    // testing(NewPromise);
    // testing2(Promise, () => testing2(NewPromise));
    testing2(NewPromise);
  };

  return (
    <div>
      <h1>this is new function home page</h1>
      <button onClick={handleClick}>goo</button>
    </div>
  );
};

export default PromiseComponent;
