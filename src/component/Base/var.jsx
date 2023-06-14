const Var = () => {
  const handler = () => {
    var a = 100;

    function fn() {
      console.log(a); //undefined，因为fn函数不是一个闭包
      var a = 200;
      console.log(a); //200
    }
    fn();

    console.log(a); //100
    var a;
    console.log(a); //100
    var a = 300;
    console.log(a); //300

    console.log(a == 1 && a == 300);
  };

  const handler2 = () => {
    function fn() {
      var a; //var声明表明变量a的作用域为fn函数的词法作用域，fn函数不是一个闭包
      console.log(a); //此处为undefined
      a = 200;
      console.log(a); //200
    }
    var a;
    a = 100;
    fn();
    console.log(a); //100
    var a;
    console.log(a); //100
    var a = 300;
    console.log(a); //300
  };

  return (
    <div>
      <button onClick={handler}>go1</button>
      <button onClick={handler2}>go2</button>
    </div>
  );
};

export default Var;
