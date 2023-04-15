const ArrayDistrub = () => {
  const arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
  const sorting1 = () => {
    const a = arr.sort((a, b) => (Math.random() - 0.5 > 0 ? 1 : -1));
    console.log('a: ', a);
  };

  const sorting2 = () => {
    const arr2 = arr.slice(0);

    for (let i = 1; i < arr2.length; i++) {
      const index = Math.floor(Math.random() * i);
      const temp = arr2[index];
      arr2[index] = arr2[i];
      arr2[i] = temp;
    }
    console.log('arr2: ', arr2);
  };

  const sorting3 = () => {
    const arr2 = arr.slice(0);

    for (let i = 1; i < arr2.length; i++) {
      const index = Math.floor(Math.random() * arr2.length);
      const temp = arr2[index];
      arr2[index] = arr2[i];
      arr2[i] = temp;
    }
    console.log('arr2: ', arr2);
  };

  return (
    <div>
      <button onClick={sorting1}>sorting1</button>
      <button onClick={sorting2}>sorting2</button>
      <button onClick={sorting3}>sorting3</button>
    </div>
  );
};

export default ArrayDistrub;
