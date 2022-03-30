const Index = () => {
  function formalParameter() {
    function changeObjProperty(o) {
      o.siteUrl = 'http://www.baidu.com';
      o = new Object();
      o.siteUrl = 'http://www.google.com';

      console.log(o); // {siteUrl: 'http://www.google.com'}
    }

    let webSite = new Object();
    changeObjProperty(webSite);
    console.log(webSite.siteUrl, '=========='); // http://www.baidu.com
  }

  function formalParameter2() {
    function changeObjProperty(webSite) {
      webSite = 'http://www.google.com';

      console.log(webSite); // {siteUrl: 'http://www.google.com'}
    }

    let webSite = 'http://www.baidu.com';
    changeObjProperty(webSite);
    console.log(webSite, '=========='); // http://www.baidu.com
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

  return (
    <div>
      <h1>this is interview scope page</h1>
      <button onClick={formalParameter}>formal Parameter</button>
      <br />
      <button onClick={formalParameter2}>formal Parameter2</button>
      <br />
      <button onClick={prototypeAndInstance}>prototype And Instance</button>
      <br />
    </div>
  );
};

export default Index;
