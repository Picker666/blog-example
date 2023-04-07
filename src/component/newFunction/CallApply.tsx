const NewFunction = () => {
  const newCall = () => {
    Function.prototype.newCall = function (_this) {
      if (typeof this !== "function") {
        throw new Error("must be a function!!!");
      }

      let context = _this ? _this : window;
      context.fn = this;

      const args = [...arguments].slice(1);
      const result = context.fn(...args);
      delete context.fn;
      return result;
    };

    Function.prototype.newApply = function (_this) {
      if (typeof this !== "function") {
        throw new Error("must be a function!!!");
      }

      let context = _this ? _this : window;
      context.fn = this;

      const args = [...arguments][1] || [];
      const result = context.fn(...args);
      delete context.fn;
      return result;
    };

    Function.prototype.newBind = function (context) {
      if (typeof this !== "function") {
        throw new Error("must be a function!!!");
      }

      const _this = this;
      const args = [...arguments].slice(1);

      return function F() {
        if (this instanceof F) {
          return new _this(...args, ...arguments);
        }

        return _this.apply(context, args.concat(...arguments));
      };
    };
  };

  const testNewCall = () => {
    const tester = function (num: number) {
      const result = num + 1;
      console.log(result, "======", this);
    };
    newCall();
    tester.newCall([1, 2], 66);
    tester.call([1, 2], 66);
  };

  const testNewApply = () => {
    const tester = function (num: number) {
      const result = num + 1;
      console.log(result, "======", this);
    };
    newCall();
    tester.newApply([1, 2], [66]);
    tester.apply([1, 2], [66]);
  };

  return (
    <div>
      <h1>this is new Function page</h1>
      <button onClick={testNewCall}>test New Call</button>
      <br />
      <button onClick={testNewApply}>test New Apply</button>
    </div>
  );
};

export default NewFunction;
