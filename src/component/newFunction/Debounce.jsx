const Debounce = () => {
  const debounce = (fn, time) => {
    let timeout = null;
    return (...rest) => {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      timeout = setTimeout(() => {
        fn(rest);
        timeout = null;
      }, time);
    };
  };

  const handleClick = debounce((event) => {
    console.log("event: ", event);
  }, 1000);

  return (
    <div>
      <h1>this is new Function for Debounce</h1>
      <button onClick={handleClick}>please click quickly</button>
    </div>
  );
};

export default Debounce;
