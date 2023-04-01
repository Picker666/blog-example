const Inherit = () => {
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
    function Parent1() {
      this.name = 'Picker';
    }

    Parent1.prototype.getName = function () {
      return this.name;
    };

    function Child1() {
      Parent1.call(this);
      this.type = 'child';
    }

    const child1 = new Child1();
    console.log(child1); //  { name: 'Picker', type: 'child' }
    console.log(child1.getName()); //  child1.getName is not a function
  };

  return (
    <div>
      <button onClick={inherit1}>inherit1</button>
      <button onClick={inherit2}>1nherit2</button>
    </div>
  );
};

export default Inherit;
