import React, { useState } from 'react';

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }
  handleClick = () => {
    this.setState({ count: this.state.count + 1 });
    this.setState({ count: this.state.count + 1 });
    // 这样写只会加1
  };
  handleClickFn = () => {
    this.setState((prevState) => {
      return { count: prevState.count + 1 };
    });
    this.setState((prevState) => {
      return { count: prevState.count + 1 };
    });
  };

  handleClickTime = () => {
    setTimeout(() => {
      this.setState({ count: this.state.count + 1 });
      this.setState({ count: this.state.count + 1 });
    }, 0);
  };
  render() {
    return (
      <>
        Count: {this.state.count}
        <button onClick={this.handleClick}>+</button>
        <button onClick={this.handleClickFn}>+</button>
        <button onClick={this.handleClickTime}>+</button>
      </>
    );
  }
}

const Counter1 = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
    setCount(count + 1);
  };

  const handleClickFn = () => {
    setCount((c) => c + 1);
    setCount((c) => c + 1);
  };

  const handleClickTime = () => {
    setTimeout(() => {
      setCount(count + 1);
      setCount(count + 1);
      console.log(count, '========');
    }, 0);
  };

  return (
    <>
      Count: {count}
      <button onClick={handleClick}>handleClick</button>
      <button onClick={handleClickFn}>handleClickFn</button>
      <button onClick={handleClickTime}>handleClickTime</button>
    </>
  );
};

export default Counter;
// export default Counter1;
