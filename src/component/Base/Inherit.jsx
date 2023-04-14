const Inherit = () => {
  function Parent() {
    this.name = 'Picker';
  }

  Parent.prototype.getName = function () {
    return this.name;
  };
  const inherit1 = function () {
    function Parent() {
      this.name = 'Picker';
      this.property = 'Parent';
    }

    Parent.prototype.getParentValue = function () {
      return this.property;
    };

    function Child() {
      this.name = 'sub - Picker';
      this.subproperty = 'Child';
    }

    // 继承Parent
    Child.prototype = new Parent();

    Child.prototype.getChildValue = function () {
      return this.subproperty;
    };

    const instance = new Child();
    const instance1 = new Parent();
    instance1.name = 'Picker 666';
    console.log(instance.getParentValue()); // Parent
    console.log(instance.getChildValue()); // Child

    console.log(instance.name); // sub - Picker
    console.log(instance1.name); // Picker 666
  };

  const inherit2 = function () {
    function Child() {
      Parent.call(this);
      this.type = 'child';
    }

    const child = new Child();
    console.log('child', child); //  Child {name: 'Picker', type: 'child'}
    // console.log('child.getName()', child.getName()); //  child.getName is not a function
    console.log('child instanceof Child', child instanceof Child); // false
  };

  const inherit3 = function () {
    function Child() {
      const instance = new Parent();
      instance.name = 'child';
      return instance;
    }

    const child = new Child();
    console.log('child', child); //  Parent {name: 'child'}
    console.log('child.getName()', child.getName()); //  child
    console.log('child instanceof Child', child instanceof Child); // false
    console.log('child instanceof Parent', child instanceof Parent); // true
  };

  const inherit4 = function () {
    function Child() {
      const instance = new Parent();
      for (let attr in instance) {
        this[attr] = instance[attr];
      }
      this.name = 'child';
    }

    const child = new Child();
    console.log('child', child); //  Child {name: 'child', getName: ƒ}
    console.log('child.getName()', child.getName()); //  child
    console.log('child instanceof Child', child instanceof Child); // true
  };

  const inherit5 = function () {
    function Child() {
      Parent.call(this);
      this.name = 'child';
    }
    Child.prototype = new Parent();
    Child.prototype.constructor = Child;

    const child = new Child();

    console.log('child', child); //  Child {name: 'child', getName: ƒ}
    console.log('child.getName()', child.getName()); //  child
    console.log('child instanceof Child', child instanceof Child); // true
  };

  const inherit6 = function () {
    function Child() {
      Parent.call(this);
      this.name = 'child';
    }

    function Temp() {
      console.log('======');
    }

    Temp.prototype = new Parent();
    Child.prototype = new Temp();

    Child.prototype.constructor = Child;

    const child = new Child();

    console.log('child', child); //  Child {name: 'child', getName: ƒ}
    console.log('child.getName()', child.getName()); //  child
    console.log('child instanceof Child', child instanceof Child); // true
  };

  return (
    <div>
      <button onClick={inherit1}>原型链继承</button>
      <button onClick={inherit2}>构造函数继承</button>
      <button onClick={inherit3}>实例继承</button>
      <button onClick={inherit4}>复制继承</button>
      <button onClick={inherit5}>组合继承</button>
      <button onClick={inherit6}>寄生组合继承</button>
    </div>
  );
};

export default Inherit;
