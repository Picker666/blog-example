const PromiseComponent = () => {
  function PM(callback) {
    const _this = this;
    _this.value = undefined;
    _this.currentState = 'pending';
    _this.resolveSolutions = [];
    _this.rejectSolutions = [];
  
    _this.resolve = function (val) {
      _this.value = val;
      _this.currentState = 'fulfilled';
      _this.resolveSolutions?.forEach((cb) => cb(_this.value));
    };
  
    _this.reject = function (err) {
      _this.value = err;
      _this.currentState = 'fulfilled';
      _this.resolveSolutions?.forEach((cb) => cb(_this.value));
    };
  
    callback(_this.resolve, _this.reject);
  }
  
  const thenHandler = (p, lastResult, resolve, reject) => {
    if (lastResult instanceof PM) {
      lastResult.then(resolve, reject);
    } else {
      resolve(lastResult);
    }
  };
  
  PM.resolve = function (val) {
    return new PM((resolve, reject) => {
      resolve(val);
    });
  };
  
  PM.reject = function (err) {
    return new PM((resolve, reject) => {
      reject(err);
    });
  };
  
  PM.prototype.then = function (fulfilled, rejected) {
    const _this = this;
  
    let successCB = fulfilled;
    let failCB = rejected;
  
    if (typeof successCB !== 'function') {
      successCB = (val) => val;
    }
  
    if (typeof failCB !== 'function') {
      failCB = (err) => {
        throw err;
      };
    }
  
    if (_this.currentState === 'pending') {
      return new PM((resolve, reject) => {
        const nextThis = this;
        _this.resolveSolutions.push((val) => {
          try {
            const lastResult = successCB(val);
            thenHandler(nextThis, lastResult, resolve, reject);
          } catch (err) {
            failCB(err);
          }
        });
  
        _this.rejectSolutions.push((val) => {
          try {
            const lastResult = successCB(val);
            thenHandler(nextThis, lastResult, resolve, reject);
          } catch (err) {
            failCB(err);
          }
        });
      });
    }
  
    if (_this.currentState === 'fulfilled') {
      return new PM((resolve, reject) => {
        const nextThis = this;
        try {
          const lastResult = successCB(_this.value);
          thenHandler(nextThis, lastResult, resolve, reject);
        } catch (err) {
          failCB(err);
        }
      });
    }
  
    if (_this.currentState === 'rejected') {
      return new PM((resolve, reject) => {
        const nextThis = this;
        try {
          const lastResult = successCB(_this.value);
          thenHandler(nextThis, lastResult, resolve, reject);
        } catch (err) {
          failCB(err);
        }
      });
    }
  };
  
  PM.prototype.catch = function (rejected) {
    this.then(null, rejected);
  };
  
  PM.prototype.finally = function (callback) {
    return this.then(
      (val) => {
        callback();
        return val;
      },
      (err) => {
        callback();
        return err;
      }
    );
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
    }).then().then()
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
      ).finally((v) => {
        console.log('================================', v);
        setTimeout(() => {
          console.log('=========倒计时=======================');
        }, 1000);
      }).then((v) => {
        console.log('=====================vv===========', v);
        console.log('测试开始啦!!!=========================================');
        return MP.resolve('88');
      }, (err) => {
        console.log('======================err==========', err);
      }).then((v) => {
        console.log('======', v);
        lastResolved && lastResolved();
      });

  const handleClick = () =>testing(Promise, () => testing(PM))

  return (
    <div>
      <h1>this is 404 page</h1>
      <button onClick={handleClick}>执行</button>
    </div>
  );
};

export default PromiseComponent;
