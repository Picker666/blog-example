/* eslint-disable react/prop-types */
import { Component } from "react";

class Son extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: "我是一个msg数据",
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("getDerivedStateFromProps", nextProps);
    console.log("getDerivedStateFromProps", prevState);
    return { name: "Christine" };
  }

  //组件挂载完成时候触发的生命周期函数
  componentDidMount() {
    //Dom操作，请求数据放在这个里面
    console.log("04组件挂载完成");
  }

  //是否要更新数据，如果返回true才会更新数据
  shouldComponentUpdate(nextProps, nextState) {
    console.log("01是否要更新数据");
    console.log(nextProps); //父组件传给子组件的值，这里没有会显示空
    console.log(nextState); //数据更新后的值

    return true; //返回true，确认更新
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log(this.son);
    console.log("getSnapshotBeforeUpdate: ", prevProps);
    console.log("getSnapshotBeforeUpdate: ", prevState);
    return null;
  }

  //更新数据时候触发的生命周期函数
  componentDidUpdate() {
    console.log("04组件更新完成");
  }

  setMsg = () => {
    this.setState({
      msg: "我是改变后的msg数据",
    });
  };

  //组件将要销毁的时候触发的生命周期函数，用在组件销毁的时候执行操作
  componentWillUnmount() {
    console.log("组件销毁了");
  }
  render() {
    console.log("03数据渲染render");
    return (
      <div ref={(r) => (this.son = r)}>
        生命周期函数演示--{this.state.msg}--{this.props.title}
        <br />
        <button onClick={this.setMsg}>更新msg的数据</button>
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: true,
      title: "我是app组件的标题",
    };
  }
  //创建/销毁组件
  setFlag = () => {
    this.setState({
      flag: !this.state.flag,
    });
  };
  //改变title
  setTitle = () => {
    this.setState({
      title: "我是app组件改变后的title",
    });
  };
  render() {
    return (
      <div className="App">
        {this.state.flag ? <Son ref={(son) => (this.son = son)} title={this.state.title} /> : ""}
        <hr />
        <button onClick={this.setFlag}>挂载/销毁生命周期函数组件</button>
        <button onClick={this.setTitle}>改变app组件的title</button>
      </div>
    );
  }
}
export default App;
