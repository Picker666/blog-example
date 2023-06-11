import { useEffect, useRef } from 'react';

const WebWorker = () => {
  const workerRef = useRef(null);
  const timeRef = useRef(null);

  const timeCount = () => {
    console.log('=======');
    workerRef.current.postMessage({ type: 'start' });
    timeRef.current = Date.now();
    console.log('timeRef.current: ', timeRef.current);
  };

  const handlerMessage = (event) => {
    if (event.data === 20) {
      console.log(Date.now() - timeRef.current, 'during');
      console.log('=======-------');
      workerRef.current.postMessage({ type: 'end' });
      // workerRef.current.terminate();
    }
  };

  const startWorker = () => {
    if (typeof workerRef !== 'undefined') {
      if (workerRef.current === null) {
        workerRef.current = new Worker(new URL('./worker.js', import.meta.url), { name: 'timeCount' });
        workerRef.current.onmessage = handlerMessage;
      }
    } else {
      console.log('worker is not available...');
    }
  };

  useEffect(() => {
    startWorker();

    return () => {
      workerRef.current.terminate();
    };
  }, []);

  return (
    <div>
      <h1>this is web worker page</h1>
      <button onClick={timeCount}>计时工作</button>
      <div>setTimeout 时间缩短一倍。。。</div>
    </div>
  );
};

export default WebWorker;
