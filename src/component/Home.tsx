import { useEffect, useMemo, useState } from 'react';
// import {}
import './index.less';

const Home = () => {
  const [goodsList, setGoodsList] = useState([]);
  useEffect(() => {
    const goods = [
      {
        url: '',
        name: '苹果',
        price: 10.99,
      },
      {
        url: '',
        name: '香蕉',
        price: 20.99,
      },
      {
        url: '',
        name: '菠萝-广西香蕉新鲜包熟不熟不要钱666',
        price: 30.99,
      },
      {
        url: '',
        name: '车厘子',
        price: 40.99,
      },
      {
        url: '',
        name: '西梅',
        price: 50.99,
      },
    ];
  }, []);

  const goodsDomsList = useMemo(() => {
    return goodsList;
  }, [goodsList]);

  debugger;

  return (
    <div className="container">
      <div className="good">A</div>
      <div className="good">B</div>
      <div className="good">C</div>
      <div className="good">D</div>
      <div className="good">E</div>
    </div>
  );
};

export default Home;
