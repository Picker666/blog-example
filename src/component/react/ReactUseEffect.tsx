import { useEffect, useState } from "react";

const ReactUseEffect = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("useEffect with null");
    return () => {
      console.log("useEffect with null === return");
    };
  });

  useEffect(() => {
    console.log("useEffect with []");
    return () => {
      console.log("useEffect with [] === return");
    };
  }, []);

  useEffect(() => {
    console.log("useEffect with [dependencies]");
    return () => {
      console.log("useEffect with [dependencies] === return");
    };
  }, [count]);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <h3>this is useEffect page</h3>
      <button onClick={handleClick}>count: {count}</button>
    </div>
  );
};

export default ReactUseEffect;
