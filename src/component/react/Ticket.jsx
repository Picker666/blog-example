import { useEffect, useRef, useState } from "react";

const Ticket = () => {
  const [time, setTime] = useState(10);
  const timeOutRef = useRef(null);

  const timeout = () => {
    timeOutRef.current = setTimeout(() => {
      clearTimeout(timeOutRef.current);
      timeOutRef.current = null;

      setTime((t) => {
        if (t > 0) {
          timeout();
        }
        return t - 1;
      });
    }, 1000);
  };

  // useEffect(() => {
  //   if (time > 0) {
  //     timeout();
  //   } else {
  //     setShow(true);
  //   }
  // }, [time]);

  useEffect(() => {
    timeout();

    return () => {
      if (timeOutRef.current) {
        clearTimeout(timeOutRef.current);
      }
    };
  }, []);

  const handleClick = () => {
    console.log('=============');
  };

  return (
    <div>
      抢票软件。。。
      {time <= 0 ? <div onClick={handleClick}>开枪啦。。。。</div> : <div>剩余时间{time}</div>}
    </div>
  );
};

export default Ticket;
