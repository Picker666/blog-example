import React, { useState, useCallback, useEffect } from "react";

const set = new Set();

function Callback() {
  const [count, setCount] = useState(1);
  const [val, setVal] = useState("");

  const callback = () => {
    console.log(count, "-----------------");
    return () => {
      console.log(count, "======================");
    };
  };
  set.add(callback);

  return (
    <div>
      <h4>{count}</h4>
      <h4>{set.size}</h4>
      <h4>{val}</h4>
      <div>
        <button onClick={() => setCount(count + 1)}>+</button>
        <input value={val} onChange={(event) => setVal(event.target.value)} />
        <button onClick={() => callback()()}>plus</button>
      </div>
    </div>
  );
}

function Parent() {
  const [count, setCount] = useState(1);
  const [val, setVal] = useState("");

  const callback = useCallback(() => {
    return count;
  }, [count]);
  return (
    <div>
      <h4>{count}</h4>
      <Child callback={callback} />
      <div>
        <button onClick={() => setCount(count + 1)}>+</button>
        <input value={val} onChange={(event) => setVal(event.target.value)} />
      </div>
    </div>
  );
}

function Child({ callback }) {
  const [count, setCount] = useState(() => callback());
  useEffect(() => {
    setCount(callback());
  }, [callback]);
  return <div>{count}</div>;
}

// export default Callback;
export default Parent;
