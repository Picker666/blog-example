const Index = () => {
  const sorting = () => {
    const arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    const a = arr.sort((a, b) => (Math.random() - 0.5 > 0 ? 1 : -1));
    console.log('a: ', a);
  };
  return (
    <div>
      <h1>this is base index page</h1>
      <div style={{ backgroundColor: 'lightblue', padding: '5px' }}>
        <div style={{ width: '100px', height: '50px', float: 'left', backgroundColor: 'orange' }} onClick={sorting}>
          666
        </div>
        <div style={{ width: '100px', height: '50px', float: 'left', backgroundColor: 'deepskyblue' }}>888</div>
      </div>
      <div style={{ backgroundColor: '#999' }}>=============================</div>
    </div>
  );
};

export default Index;
