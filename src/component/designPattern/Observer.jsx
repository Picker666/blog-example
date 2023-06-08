import { useEffect } from 'react';

class Subject {
  constructor(name) {
    this.name = name;
    this.state = '睡觉';
    this.observers = [];
  }

  stateChange(state) {
    this.state = state;
    this.observers.forEach((observer) => observer.handler(this));
  }

  attach(observer) {
    this.observers.push(observer);
  }
}

class Observer {
  constructor(name) {
    this.name = name;
  }

  handler(subject) {
    console.log(`${this.name} 观察了 ${subject.name} 正 ${subject.state}`);
  }
}

const ObserverDemo = () => {
  useEffect(() => {
    const baby = new Subject('Borry');
    const picker = new Observer('Picker');

    baby.attach(picker);

    baby.stateChange('睡醒了...');
  }, []);

  return (
    <div>
      <h1>观察者模式：</h1>
      <p>1、有观察者（Observer）和被观察者（Subject）两个对象;</p>
      <p>2、观察者对被观察者的监听（观察）是需要被观察者来实现的；（Subject.attach）</p>
      <p>3、当被观察者发生变化，被观察者会主动通知观察者；</p>
      <p>4、观察者只需要实现一个方法，当被观察者变化时执行。</p>
      <p></p>
      <p></p>
    </div>
  );
};

export default ObserverDemo;
