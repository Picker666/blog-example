const Index = () => {
  function formalParameter() {
    function changeObjProperty(o) {
      o.siteUrl = "http://www.baidu.com";
      o = new Object();
      o.siteUrl = "http://www.google.com";

      console.log(o); // {siteUrl: 'http://www.google.com'}
    }

    let webSite = new Object();
    changeObjProperty(webSite);
    console.log(webSite.siteUrl, "=========="); // http://www.baidu.com
  }

  function formalParameter2() {
    function changeObjProperty(webSite) {
      webSite = "http://www.google.com";

      console.log(webSite); // {siteUrl: 'http://www.google.com'}
    }

    let webSite = "http://www.baidu.com";
    changeObjProperty(webSite);
    console.log(webSite, "=========="); // http://www.baidu.com
  }

  function prototypeAndInstance() {
    function Foo() {
      Foo.a = function () {
        console.log(1);
      };
      this.a = function () {
        console.log(2);
      };
    }

    Foo.prototype.a = function () {
      console.log(3);
    };
    Foo.a = function () {
      console.log(4);
    };

    Foo.a();
    let obj = new Foo();
    obj.a();
    Foo.a();
  }

  function handleOperator() {
    // console.log(1 + '1')
    // console.log(2 * '2');
    // console.log([1,2] + [1,2]);
    // console.log('a' ++ 'b');
  }

  function scopeA(b) {
    console.log(b, "===a===");
    function b() {
      console.log(b);
    }
    b();
    b = 1;

    console.log(b, "=====last=====");
  }

  function scopeT3(greet) {
    console.log(greet); //?
    var greet = "hello";
    console.log(greet); //?
    function greet() {}
    console.log(greet); //?
  }

  function scopeTest(a, b) {
    console.log(a);
    console.log(b);
    var b = 234;
    console.log(b);
    a = 123;
    console.log(a);
    function a() {}
    var a;
    b = 456;
    console.log(b);
    var b = function () {};
    console.log(a);
    console.log(b);
  }

  function scopeTest2() {
    a = 100;
    function demo(e) {
      function e() {}
      arguments[0] = 2;
      console.log(e); //  e() {}
      if (a) {
        var b = 123;
      }
      a = 10;
      var a;
      console.log(b); // 123
      f = 123;
      console.log(a); // 10
    }

    // var a;
    demo(1);
    console.log(a); // 10
    console.log(f); // 123
  }

  return (
    <div>
      <h1>this is interview scope page</h1>
      <button onClick={formalParameter}>formal Parameter</button>
      <br />
      <button onClick={formalParameter2}>formal Parameter2</button>
      <br />
      <button onClick={prototypeAndInstance}>prototype And Instance</button>
      <br />
      <button onClick={handleOperator}>handle Operator</button>
      <br />
      <button onClick={() => scopeA(6)}>scope A</button>
      <br />
      <button onClick={() => scopeT3(null)}>scope t3</button>
      <br />
      <button onClick={() => scopeTest(1, 2)}>scope test</button>
      <br />
      <button onClick={scopeTest2}>scope test2</button>
      <br />
    </div>
  );
};

export default Index;
