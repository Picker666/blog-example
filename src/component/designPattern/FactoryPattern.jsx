import { useState } from 'react';

const FactoryPatter = () => {
  const [superAdmin, setSuperAdmin] = useState();
  const [admin, setAdmin] = useState();
  const [normal, setNormal] = useState();

  // JS设计模式之简单工厂改良版
  function simpleFactory(role){
    function user(opt){
      this.name = opt.name;
      this.viewPage = opt.viewPage;
    }

    switch(role){
      case "superAdmin":
        return new user({name:"superAdmin",viewPage:["首页","发现页","通讯录","应用数据","权限管理"]});
        break;

      case "admin":
        return new user({name:"admin",viewPage:["首页","发现页","通讯录","应用数据"]});
        break;

      case "normal":
        return new user({name:"normal",viewPage:["首页","发现页","通讯录"]});
    }
  }

  const handleSimpleFactoryClick = () => {
    const _superAdmin = simpleFactory("superAdmin");
    console.log(_superAdmin);
    
    let _admin = simpleFactory("admin");
    console.log(_admin);
    
    let _normal = simpleFactory("normal");
    console.log(_normal);

    setSuperAdmin(JSON.stringify(_superAdmin));
    setAdmin(JSON.stringify(_admin));
    setNormal(JSON.stringify(_normal));
  }

  // JS设计模式之工厂方法模式
    function factory(role){
        if(this instanceof factory){
            var a = new this[role]();
            return a;
        }else{
            return new factory(role);
        }
    }

    factory.prototype={
        "superAdmin":function(){
            this.name="超级管理员";
            this.viewPage=["首页","发现页","通讯录","应用数据","权限管理"];
        },
        "admin":function(){
            this.name="管理员";
            this.viewPage=["首页","发现页","通讯录","应用数据"];
        },
        "user":function(){
            this.name="普通用户";
            this.viewPage=["首页","发现页","通讯录"];
        }
    }

    const handleFactoryClick = () => {
      let _superAdmin = factory("superAdmin");
      console.log(_superAdmin);
      let _admin = factory("admin");
      console.log(_admin);
      let _user = factory("user");
      console.log(_user);

      setSuperAdmin(JSON.stringify(_superAdmin));
    setAdmin(JSON.stringify(_admin));
    setNormal(JSON.stringify(_user));
  }

  return (<div>
    <h2>this is factory pattern</h2>
    <button onClick={handleSimpleFactoryClick}>Simple Factory</button>
    <br />
    <button onClick={handleFactoryClick}>Factory</button>
    <br/>
    <div key="superAdmin">superAdmin: {superAdmin}</div>
    <div key="admin">admin: {admin}</div>
    <div key="normal">normal: {normal}</div>
  </div>)
}

export default FactoryPatter;
