import { useLayoutEffect, useState, useRef, useEffect } from "react";

const LayoutEffect1 = () => {
  const [n, setN] = useState(0);
  const onClick = () => {
    setN((i) => i + 1);
  };
  useEffect(() => {
    console.log("useEffect");
  });
  useLayoutEffect(() => {
    // 改成 useEffect 试试
    console.log("useLayoutEffect");
  });
  return (
    <div className="App">
      <h1>n: {n}</h1>
      <button onClick={onClick}>Click</button>
    </div>
  );
};

function LayoutEffect2() {
  const [n, setN] = useState(0);
  const time = useRef<number | null>(null);

  const onClick = () => {
    setN((i) => i + 1);
    time.current = performance.now();
  };
  useLayoutEffect(() => {
    // 改成 useEffect 试试
    if (time.current) {
      console.log(performance.now() - time.current);
    }
  });
  return (
    <div className="App">
      <h1>n: {n}</h1>
      <button onClick={onClick}>Click</button>
    </div>
  );
}

const LayoutEffect = () => {
  return (
    <div>
      <LayoutEffect2 />
      <hr />
      <LayoutEffect1 />
    </div>
  );
};

export default LayoutEffect;
