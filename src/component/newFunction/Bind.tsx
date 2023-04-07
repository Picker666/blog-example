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
