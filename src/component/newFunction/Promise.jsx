const PromiseComponent = () => {
  function PM(callback) {
    const _this = this;
    _this.value = undefined;
    _this.currentState = 'pending';
    _this.resolveSolutions = [];
    _this.rejectSolutions = [];

    _this.resolve = function (val) {
      if (val instanceof PM) {
        // PM.resolve 时候，参数肯能是PM实例
        return val.then(_this.resolve, _this.reject);
      } else {
        if (_this.currentState === 'pending') {
          // PM.race 时候存在多个PM 实例在同一个 PM中resolve
          _this.value = val;
          _this.currentState = 'fulfilled';
          _this.resolveSolutions?.forEach((cb) => cb(_this.value));
        }
      }
    };

    _this.reject = function (err) {
      _this.value = err;
      _this.currentState = 'rejected';
      _this.rejectSolutions?.forEach((cb) => cb(_this.value));
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
    if (val instanceof PM) {
      return val;
    }
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
            const lastResult = failCB(val);
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
          const lastResult = failCB(_this.value);
          thenHandler(nextThis, lastResult, resolve, reject);
        } catch (err) {
          failCB(err);
        }
      });
    }
  };

  PM.race = function (pms) {
    return new PM((resolve, reject) => {
      pms.forEach((pm) => {
        PM.resolve(pm).then(resolve, reject);
      });
    });
  };

  PM.all = function (pms) {
    return new PM((resolve, reject) => {
      let length = pms.length;
      const res = new Array(length);
      pms.forEach((pm, index) => {
        PM.resolve(pm).then((value) => {
          length--;
          res[index] = value;
          if (length === 0) {
            resolve(res);
          }
        }, reject);
      });
    });
  };

  PM.allSettled = function (pms) {
    return new PM((resolve, reject) => {
      let length = pms.length;
      const res = new Array(length);

      pms.forEach((pm, index) => {
        PM.resolve(pm).then(
          (value) => {
            length--;
            res[index] = { status: 'fulfilled', value };
            if (length === 0) {
              resolve(res);
            }
          },
          (value) => {
            length--;
            res[index] = { status: 'rejected', value };
            if (length === 0) {
              resolve(res);
            }
          }
        );
      });
    });
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
      .finally((v) => {
        console.log('================================', v);
        setTimeout(() => {
          console.log('=========倒计时=======================');
        }, 1000);
      })
      .then(
        (v) => {
          console.log('=====================vv===========', v);
          console.log('测试开始啦!!!=========================================');
          return MP.resolve('88');
        },
        (err) => {
          console.log('======================err==========', err);
        }
      )
      .then((v) => {
        console.log(v);
        return MP.resolve(
          new PM((resolve, reject) => {
            setTimeout(() => {
              resolve('999');
            }, 1000);
          })
        );
      })
      .then((v) => {
        console.log('======', v);
        lastResolved && lastResolved();
      });

  const forRace = (MP, lastResolved) => {
    const p1 = new MP((resolved, reject) => {
      setTimeout(() => {
        console.log('1000s====');
        resolved('1000s');
      }, 1000);
    });
    const p2 = new MP((resolved, reject) => {
      setTimeout(() => {
        console.log('2000s====');
        resolved('2000s');
      }, 2000);
    });
    const p3 = new MP((resolved, reject) => {
      setTimeout(() => {
        console.log('3000s====');
        resolved('3000s');
      }, 3000);
    });

    MP.race([p1, p2, p3])
      .then(
        (val) => {
          console.log('val: ', val);
        },
        (err) => {
          console.log('err: ', err);
        }
      )
      .then(() => {
        lastResolved && lastResolved();
      });
  };

  const forAll = (MP, lastResolved) => {
    const p1 = new MP((resolved, reject) => {
      setTimeout(() => {
        console.log('1000s====');
        resolved('1000s');
      }, 1000);
    });
    const p2 = new MP((resolved, reject) => {
      setTimeout(() => {
        console.log('2000s====');
        // resolved('2000s')
        reject('2000s');
      }, 2000);
    });
    const p3 = new MP((resolved, reject) => {
      setTimeout(() => {
        console.log('3000s====');
        resolved('3000s');
      }, 3000);
    });

    MP.all([p1, p2, p3])
      .then(
        (val) => {
          console.log('val: ', val);
        },
        (err) => {
          console.log('err: ', err);
        }
      )
      .then(() => {
        lastResolved && lastResolved();
      });
  };

  const forAllSettled = (MP, lastResolved) => {
    const p1 = new MP((resolved, reject) => {
      setTimeout(() => {
        console.log('1000s====');
        resolved('1000s');
      }, 1000);
    });
    const p2 = new MP((resolved, reject) => {
      setTimeout(() => {
        console.log('2000s====');
        // resolved('2000s')
        reject('2000s');
      }, 2000);
    });
    const p3 = new MP((resolved, reject) => {
      setTimeout(() => {
        console.log('3000s====');
        resolved('3000s');
      }, 3000);
    });

    MP.allSettled([p1, p2, p3])
      .then(
        (val) => {
          console.log('val: ', val);
        },
        (err) => {
          console.log('err: ', err);
        }
      )
      .then(() => {
        lastResolved && lastResolved();
      });
  };

  const handleClick = () => testing(Promise, () => testing(PM));
  const handleClick1 = () => forRace(Promise, () => forRace(PM));
  const handleClick2 = () => forAll(Promise, () => forAll(PM));
  const handleClick3 = () => forAllSettled(Promise, () => forAllSettled(PM));

  return (
    <div>
      <h1>this is 404 page</h1>
      <button onClick={handleClick}>promise.then执行</button>
      <button onClick={handleClick1}>race执行</button>
      <button onClick={handleClick2}>all执行</button>
      <button onClick={handleClick3}>all settled执行</button>
    </div>
  );
};

export default PromiseComponent;
