import { useRef, createRef, useState, useEffect } from "react";

const FocusInput = () => {
  const inputElement = createRef();

  const handleFocusInput = () => {
    inputElement.current.focus();
  };

  return (
    <>
      <input type="text" ref={inputElement} />
      <button onClick={handleFocusInput}>Focus Input</button>
    </>
  );
};

const FocusInputHook = () => {
  const inputElement = useRef();

  const handleFocusInput = () => {
    inputElement.current.focus();
  };

  return (
    <>
      <input type="text" ref={inputElement} />
      <button onClick={handleFocusInput}>Focus Input Hook</button>
    </>
  );
};

const Test = () => {
  const [renderIndex, setRenderIndex] = useState(1);
  const refFromUseRef = useRef();
  const refFromCreateRef = createRef();

  if (!refFromUseRef.current) {
    refFromUseRef.current = renderIndex;
  }

  if (!refFromCreateRef.current) {
    refFromCreateRef.current = renderIndex;
  }

  return (
    <>
      <p>Current render index: {renderIndex}</p>
      <p>
        <b>refFromUseRef</b> value: {refFromUseRef.current}
      </p>
      <p>
        <b>refFromCreateRef</b> value: {refFromCreateRef.current}
      </p>
      <button onClick={() => setRenderIndex((prev) => prev + 1)}>
        Cause re-render
      </button>
    </>
  );
};

const App = () => {
  const [count, setCount] = useState(0);
  const handleAlertClick = () => {
    setTimeout(() => {
      alert("you click on:" + count);
    }, 3000);
  };

  return (
    <div>
      <p>{count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
      <button onClick={handleAlertClick}>Show alert</button>
    </div>
  );
};

const AppRef = () => {
  const [count, setCount] = useState(0);
  const lastestCount = useRef(count);
  useEffect(() => {
    lastestCount.current = count;
  }, [count]);

  const handleAlertClick = () => {
    setTimeout(() => {
      alert("you click on:" + lastestCount.current);
    }, 3000);
  };

  return (
    <div>
      <p>{count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
      <button onClick={handleAlertClick}>Show alert</button>
    </div>
  );
};

const TwoCount = () => {
  const [count, setCount] = useState(0);
  const lastestCount = useRef(count);
  useEffect(() => {
    lastestCount.current = count;
  }, [count]);

  return (
    <div>
      <p>preCount： {lastestCount.current}</p>
      <p>Current Count：{count}</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
};

const RefSum = () => {
  return (
    <>
      <FocusInput />
      <br />
      <FocusInputHook />
      <hr />
      <Test />
      <hr />
      <App />
      <hr />
      <AppRef />
      <hr />
      <TwoCount />
    </>
  );
};

export default RefSum;
