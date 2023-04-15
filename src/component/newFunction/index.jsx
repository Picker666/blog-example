const STATE = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected',
};

const PromiseComponent = () => {
  const deepCopy = (data, mp = new Map()) => {
    let copyedData;

    if (typeof data === 'object' && data !== null) {
      const dataValue = mp.get(data);
      if (dataValue) {
        return dataValue;
      }

      mp.set(data, data);
      copyedData = new data.constructor();

      if (Array.isArray(data)) {
        copyedData = data.map((item) => deepCopy(item, mp));
      } else {
        const reflectKeys = Reflect.ownKeys(data);
        reflectKeys.forEach((attr) => {
          copyedData[attr] = deepCopy(data[attr], mp);

          if (!Object.propertyIsEnumerable.call(data, attr)) {
            Object.defineProperty(copyedData, attr, {
              enumerable: false,
            });
          }
        });
      }
    } else {
      copyedData = data;
    }

    return copyedData;
  };

  const handleClick = () => {
    const obj = {
      name: 'picker666',
      age: 22,
      sex: '男',
      hobby: ['跑步', '读书', '睡觉'],
      fn: function () {
        console.log(this.name);
      },
      friends: [11, 2, 3, { name: 'picker', age: 18 }],
      time: new Date(),
      reg: new RegExp(/D{9,19}/gi),
      id: Symbol('picker'),
    };

    function People(name) {
      this.name = name;
    }
    People.prototype.eat = function () {
      console.log(`${this.name} eat any thing!`);
    };
    obj[Symbol('picker666')] = 'picker666';
    obj.love = new People('Christine');

    Object.defineProperty(obj, 'learning', {
      enumerable: false,
      value: 666,
    });

    obj.other = obj;

    console.log('obj: ', obj, Object.keys(obj));
    const targetData = deepCopy(obj);
    console.log('targetData: ', targetData, Object.keys(targetData));
    console.log(new Date(targetData.time).getTime());
    console.log();
  };

  return (
    <div>
      <h1>this is 404 page</h1>
      <button onClick={handleClick}>goo</button>
    </div>
  );
};

export default PromiseComponent;
