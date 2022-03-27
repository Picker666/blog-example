const InterviewIndex = () => {
  const objWithArray = () => {
    var obj = {
      '6': 3,
      '1': 5,
      '2': 2,
      length: 2,
      splice: Array.prototype.splice,
      push: Array.prototype.push,
    };
    obj.push(-6);
    obj.push(0);
    obj.push(6);
    obj.push(66);
    obj.push(666);
    console.log(obj);
  };

  return (
    <div>
      <h1>this is interview index page</h1>
      <button onClick={objWithArray}>object With Array</button>
      <br />
    </div>
  );
};

export default InterviewIndex;
