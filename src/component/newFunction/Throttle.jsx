const Throttle = () => {
  const throttle = (fn, time) => {
    let timeout = null;
    return (...rest) => {
      if (!timeout) {
        timeout = setTimeout(() => {
          fn(rest);
          timeout = null;
        }, time);
      }
    };
  };

  const handleClick = throttle((event) => {
    console.log("event: ", event);
  }, 1000);

  return (
    <div>
      <h1>this is new Function for Throttle</h1>
      <button onClick={handleClick}>please click quickly</button>
    </div>
  );
};

export default Throttle;
