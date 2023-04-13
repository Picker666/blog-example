const Position = () => {
  console.log('this is a position testing!');
  return (
    <div style={{ position: 'relative', backgroundColor: 'lightblue' }}>
      <div style={{ position: 'absolute', backgroundColor: 'orange' }}>
        <p>9999</p>
        <div style={{ position: 'absolute', backgroundColor: 'red' }}>000</div>
      </div>
    </div>
  );
};

export default Position;
