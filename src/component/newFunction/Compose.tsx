const Compose = () => {
  const newCompose = (...func) => {
    return function (...rest) {
      return func.reduceRight(function (a, b) {
        // eslint-disable-next-line prefer-spread
        return b.apply(null, rest);
      }, rest);
    };
  };

  const handleClick = () => {
    const a = newCompose(Math.floor, parseFloat)(2.999);
    console.log('=========', a);
  };

  return (
    <div>
      <button onClick={handleClick}>66</button>
    </div>
  );
}

export default Compose;
