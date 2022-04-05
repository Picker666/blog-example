const Index = () => {
  const eventLoopTest = () => {
    setTimeout(() => {
      console.log('setTimeout1000==========');
    }, 1000);

    setTimeout(() => {
      console.log('setTimeout0==========');
    }, 0);

    new Promise((resolve, reject) => {
      console.log('Promise=========');
      resolve('success======');
    })
      .then((res) => {
        console.log('resolve=========');
        return Promise.reject('reject======');
      })
      .catch((err) => {
        console.log(err);
      });

    console.log('start========');
  };

  return (
    <div>
      <h1>this is base index page</h1>
      <button onClick={eventLoopTest}>event Loop Test</button>
    </div>
  );
};

export default Index;
