const PromiseComponent = () => {
  const MyPromise = function (callback) {
    this.state = 'pending';
    this.value = undefined;

    this.resolveCallbacks = [];
    this.rejectCallbacks = [];

    this.resolve = (data) => {
      this.state = 'resolve';
      this.value = data;
      this.resolveCallbacks.forEach(cb => cb())
    }

    this.reject = (err) => {
      this.state = 'reject';
      this.value = err;
      this.rejectCallbacks.forEach(cb => cb())
    }

    callback(this.resolve, this.reject)
  }

  MyPromise.prototype.then = function (resolveCallback, rejectCallback) {
    const _this = this;

    const successCallback = typeof resolveCallback === 'function' ? resolveCallback : (v) => v;
    const failCallback = typeof rejectCallback === 'function' ? rejectCallback : (err) => {throw err};


    if (_this.state === 'pending') {
      return new MyPromise(function(resolve, reject) {
        function successCb () {
          try {
            const successResult = successCallback(_this.value);
            if (successResult instanceof MyPromise) {
              successResult.then(resolve, reject)
            } else {
              resolve(successResult)
            }
          } catch (err) {
            reject(err)
          }
        }

        function failCb () {
          try {
            const failResult = failCallback(_this.value);
            if (failResult instanceof MyPromise) {
              failResult.then(resolve, reject)
            } else {
              reject(failResult)
            }
          } catch (err) {
            reject(err)
          }
        }
        
        _this.resolveCallbacks.push(successCb);
        _this.rejectCallbacks.push(failCb);
      })
    } else if (_this.state === 'resolve') {
      return new MyPromise(function(resolve, reject) {
        try {
            const successResult = successCallback(_this.value);
            if (successResult instanceof MyPromise) {
              successResult.then(resolve, reject)
            } else {
              resolve(successResult)
            }
          } catch (err) {
            reject(err)
          }
      })
    } else if (_this.state === 'reject') {
      return new MyPromise(function(resolve, reject) {
        try {
            const failResult = failCallback(_this.value);
            if (failResult instanceof MyPromise) {
              failResult.then(resolve, reject)
            } else {
              resolve(failResult)
            }
          } catch (err) {
            reject(err)
          }
      })
    }
  }

  let getPromise1 = function () {
    return new MyPromise(function (resolve, reject) {
      resolve('Promise1');
        // setTimeout(() => {
        // }, 3000)
    });
};

let getPromise2 = function (key) {
    return new MyPromise(function (resolve, reject) {
        setTimeout(() => {
          resolve(`${key}_Promise2`);
        }, 2000)
    });
};

let getPromise3 = function () {
    
    return new MyPromise(function (resolve, reject) {
        setTimeout(() => {
          resolve('Promise3');
        }, 1000)
    });
};


  const execute = () => {
    getPromise1()
    .then(function (key) {
      console.log(key, '=====第一个then=====');
      return getPromise2(key);
      // return 3
    })
    .then(function (data) {
      console.log('data: ', data);
        return getPromise3(data);
    })
    .then(function (data) {
      // todo
      console.log('业务数据：', data);
    })
    // .catch(function (err) {
    //     console.log(err);
    // }); 
  };

  return (
    <div>
      <h1>this is 404 page</h1>
      <button onClick={execute}>执行</button>
    </div>
  );
};

export default PromiseComponent;
