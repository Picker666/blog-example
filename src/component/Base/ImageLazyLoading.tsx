import { useEffect } from 'react';

import { message } from 'antd';
import { throttle } from 'lodash';

const ImageLazyLoading = () => {
  const messageCustom = throttle(() => message.info('进入可视区域啦！！'), 500);
  const withOffset = () => {
    const box = document.getElementById('container');

    const handler = function () {
      const clientH = box?.clientHeight || 0; //获取屏幕可视区域的高度
      const offsetTop = document.getElementById('yellow')?.offsetTop || 0; //获取元素相对于顶部的高度
      return function (e) {
        const scrollT = e.target.scrollTop || 0; // 滚动条滚动的距离
        if (clientH + scrollT > offsetTop) {
          messageCustom();
        }
      };
    };
    const addEvent = () => {
      box?.addEventListener('scroll', handler());
    };

    const removeEvent = () => {
      box?.removeEventListener('scroll', handler());
    };

    return { addEvent, removeEvent };
  };

  const withRect = () => {
    const box = document.getElementById('container1');

    const handler = function () {
      const clientH = box?.clientHeight || 0; //获取屏幕可视区域的高度
      return function (e) {
        const targetData = document.getElementById('yellow1')?.getBoundingClientRect() || { top: -1 }; //获取目标元素相信息
        const top = targetData.top - 288;
        if (top > 0 && top < clientH) {
          messageCustom();
        }
      };
    };

    const addEvent = () => {
      box?.addEventListener('scroll', handler());
    };

    const removeEvent = () => {
      box?.removeEventListener('scroll', handler());
    };

    return { addEvent, removeEvent };
  };

  const observe = () => {
    // 观察器实例
    const io = new IntersectionObserver((entires) => {
      entires.forEach((item) => {
        // 原图片元素
        if (item.intersectionRatio > 0 && item.intersectionRatio <= 1) {
          messageCustom();
        }
      });
    });

    const target = document.getElementById('yellow2') || document.body;

    // 给每一个图片设置观察器
    const addEvent = () => {
      io.observe(target);
    };

    const removeEvent = () => {
      io.unobserve(target);
    };

    return { addEvent, removeEvent };
  };

  useEffect(() => {
    const { addEvent, removeEvent } = withOffset();
    const { addEvent: addEvent1, removeEvent: removeEvent1 } = withRect();
    const { addEvent: addEvent2, removeEvent: removeEvent2 } = observe();

    addEvent();
    addEvent1();
    addEvent2();

    return () => {
      removeEvent();
      removeEvent1();
      removeEvent2();
    };
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      <div
        id="container"
        style={{ marginTop: '200px', maxHeight: '600px', overflow: 'auto', position: 'relative', flex: '1 1 50%' }}
      >
        <p style={{ position: 'sticky ', top: '16px' }}>{'方案一：clientHeight + scroolTop > offsetTop'}</p>
        <div style={{ backgroundColor: 'green', height: '8000px' }}></div>
        <div id="yellow" style={{ backgroundColor: 'yellow', height: '800px' }}></div>
      </div>

      <div
        id="container1"
        style={{ marginTop: '200px', maxHeight: '600px', overflow: 'auto', position: 'relative', flex: '1 1 50%' }}
      >
        <p style={{ position: 'sticky ', top: '16px' }}>{'方案二：getBoundingClientRect()'}</p>
        <div style={{ backgroundColor: 'green', height: '8000px' }}></div>
        <div id="yellow1" style={{ backgroundColor: 'yellow', height: '800px' }}></div>
      </div>

      <div
        id="container2"
        style={{ marginTop: '200px', maxHeight: '600px', overflow: 'auto', position: 'relative', flex: '1 1 50%' }}
      >
        <p style={{ position: 'sticky ', top: '16px' }}>{'方案三：IntersectionObserver'}</p>
        <div style={{ backgroundColor: 'green', height: '8000px' }}></div>
        <div id="yellow2" style={{ backgroundColor: 'yellow', height: '800px' }}></div>
      </div>
    </div>
  );
};

export default ImageLazyLoading;
