/* eslint-disable prefer-rest-params */
const NoMatch = () => {
  Function.prototype.myBind = function () {
    // const [_this, ...rest] = [...arguments];
    const _this = Array.prototype.shift.call(arguments);
    const rest = Array.prototype.slice.call(arguments, 1);
    _this.fn = this;
    function F(...r) {
      const arg = [...rest, ...r];

      if (this instanceof F) {
        return _this.apply(this, arg);
      }
      _this.fn(...arg);
    }
    F.prototype = this.prototype;
    return F;
  };

  Function.prototype.newBind = function () {
    if (typeof this !== 'function') {
      throw new Error('只有方法才能调用哦！');
    }

    const arg = [...arguments];
    const _this = arg.shift();

    const key = Symbol('fn');
    _this[key] = this;

    function F() {
      const params = [...arg, ...arguments];
      if (this instanceof F) {
        _this[key] = this;
      }
      const result = _this[key](...params);

      delete [key];

      return result;
    }

    F.prototype = this.prototype;

    return F;
  };

  const testAdd = function (a, b) {
    console.log(a + b + this.c);
  };

  const test = () => {
    const test = testAdd.myBind({ c: 1 });
    test(1, 2);
  };

  return (
    <div>
      <h1>this is 404 page</h1>
      <button onClick={test}>test</button>
    </div>
  );
};

export default NoMatch;
