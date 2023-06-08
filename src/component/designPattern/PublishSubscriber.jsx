import { useEffect } from 'react';

class Event {
  constructor() {
    this.subscribers = new Map(null);
  }

  on(eventName, callback) {
    this.subscribers.set(eventName, callback);
  }

  publish(eventName, ...rest) {
    const handler = this.subscribers.get(eventName);
    handler && handler(eventName, ...rest);
  }

  remove(eventName) {
    this.subscribers.delete(eventName);
  }
}

const PublishSubscriber = () => {
  useEffect(() => {
    const event = new Event();
    // 订阅者
    event.on('lunch', (event, ...rest) => {
      console.log('event: ', event);
      console.log('rest: ', rest);
    });

    // 发布者；
    event.publish('lunch', '宫保鸡丁');
  }, []);

  return (
    <div>
      <h1>观察者模式：</h1>
      <p>1、以调度中心为主;</p>
      <p>2、订阅者只需要通过调用中心的方法，订阅相关的事件，并执行订阅方法；</p>
      <p>3、发布者只需要通过调度中心的方法，发布相关的事件；</p>
      <p></p>
      <p>总结：订阅者把自己想订阅的事件注册到调度中心（Event），当发布者发布该事件的到调度中心，也就是该事件触发时，由调度中心统一调度订阅者注册到调度中心的处理代码。</p>
    </div>
  );
};

export default PublishSubscriber;
