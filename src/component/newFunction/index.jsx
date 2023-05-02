const STATE = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected',
};

const PromiseComponent = () => {
  function NewPromise(callback) {
    const _this = this;
    _this.value = null;
    _this.reason = null;
    _this.state = STATE.PENDING;
    _this.fulfillCallback = [];
    _this.rejectCallback = [];

    _this.resolved = (value) => {
      // setTimeout(() => {
      if (_this.state === STATE.PENDING) {
        _this.value = value;
        _this.state = STATE.FULFILLED;
        _this.fulfillCallback.forEach((cb) => {
          cb(value);
        });
      }
      // });
    };

    _this.rejected = (reason) => {
      // setTimeout(() => {
      if (_this.state === STATE.PENDING) {
        _this.reason = reason;
        _this.state = STATE.REJECTED;
        _this.rejectCallback.forEach((cb) => {
          cb(reason);
        });
      }
      // });
    };

    callback(_this.resolved, _this.rejected);
  }

  NewPromise.prototype.then = function (fulfilled, rejected) {
    if (typeof fulfilled !== 'function') {
      fulfilled = (val) => val;
    }

    if (typeof rejected !== 'function') {
      rejected = (reason) => {
        throw new Error(reason);
      };
    }

    const _this = this;
    return new NewPromise((resolve, reject) => {
      if (_this.state === STATE.PENDING) {
        _this.fulfillCallback.push((val) => {
          try {
            const value = fulfilled(val);
            if (value instanceof NewPromise) {
              value.then(resolve, reject);
            } else {
              resolve(value);
            }
          } catch (err) {
            reject(err);
          }
        });

        _this.rejectCallback.push((reason) => {
          try {
            const value = rejected(reason);
            if (value instanceof NewPromise) {
              value.then(resolve, reject);
            } else {
              resolve(value);
            }
          } catch (err) {
            reject(err);
          }
        });
      }
      if (_this.state === STATE.FULFILLED) {
        try {
          const value = fulfilled(_this.value);
          if (value instanceof NewPromise) {
            value.then(resolve, rejected);
          } else {
            resolve(value);
          }
        } catch (err) {
          reject(err);
        }
      }
      if (_this.state === STATE.REJECTED) {
        try {
          const value = rejected(_this.reason);
          if (value instanceof NewPromise) {
            value.then(resolve, rejected);
          } else {
            resolve(value);
          }
        } catch (err) {
          reject(err);
        }
      }
    });
  };

  NewPromise.prototype.resolve = function resolve(value) {
    if (value instanceof NewPromise) {
      return value;
    }
    return new NewPromise((resolve, reject) => resolve(value));
  };

  NewPromise.prototype.reject = function resolve(reason) {
    return new NewPromise((resolve, reject) => reject(reason));
  };

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
      // .then()
      // .then()
      .then(
        (value) => {
          console.log('1、成功', value);
          // return value;
          return new MP((resolve, reject) => {
            setTimeout(() => {
              if (Math.random() > 1) {
                resolve('0成功了。。。。');
              } else {
                reject('0失败了。。。');
              }
            }, 1000);
          });
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
      .then((v) => {
        console.log('======', v);
        lastResolved && lastResolved();
      });

  const handleClick = () => {
    testing(Promise, () => testing(NewPromise));
    // testing(NewPromise);
  };

  return (
    <div>
      <h1>this is 404 page</h1>
      <button onClick={handleClick}>goo</button>
    </div>
  );
};

export default PromiseComponent;
