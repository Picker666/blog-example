import { useState, useEffect, useCallback } from 'react';

const useCount = () => {
  const [count, setCount] = useState({ val: 0 });
  useEffect(() => {
    setInterval(() => {
      setCount((c) => {
        return { val: c.val + 1 };
      });
    }, 1000);
  }, []);

  const getLatestCount = useCallback(() => {
    console.log('this is the value of count: ', count);
  }, [count]);

  return { count, getLatestCount };
};

const ExampleComponent = (props: {
  count: { val: number };
  getLatestCount: () => void;
}) => {
  const { getLatestCount, count } = props;

  const onClick = useCallback(() => {
    getLatestCount();
  }, [count]);

  return (
    <div>
      <div>current value: {count.val}</div>
      <button onClick={onClick}>Click</button>
    </div>
  );
};

const Index = () => {
  const { count, getLatestCount } = useCount();

  return <ExampleComponent count={count} getLatestCount={getLatestCount} />;
};

export default Index;
