const DeepCopy = () => {
  const deepCopy = (data, keyMap?: Map<unknown, unknown>) => {
    if (!keyMap) {
      keyMap = new Map();
      keyMap.set(data, data);
    }
    const newData = new data.constructor();
    for (const key in data) {
      const currentItem = data[key];
      if (currentItem === undefined || typeof currentItem !== 'object') {
        newData[key] = currentItem;
      } else if (currentItem instanceof Date) {
        newData[key] = new Date(currentItem);
      } else if (currentItem instanceof RegExp) {
        newData[key] = new RegExp(currentItem);
      } else {
        if (keyMap.get(currentItem)) {
          return { [key]: keyMap.get(currentItem) };
        }

        keyMap.set(currentItem, currentItem);

        newData[key] = deepCopy(currentItem, keyMap);
      }
    }

    return newData;
  };

  const deepCopy2 = (data, map = new Map()) => {
    let newData;
    if (data === undefined || typeof data !== 'object') {
      newData = data;
    } else if (data instanceof Date) {
      newData = new Date(data);
    } else if (data instanceof RegExp) {
      newData = new RegExp(data);
    } else {
      const oldData = map.get(data);
      if (oldData) {
        return oldData;
      }

      map.set(data, data);

      newData = new data.constructor();
      for (const key in data) {
        newData[key] = deepCopy2(data[key], map);
      }
    }

    return newData;
  };

  const deepCopy3 = (data, mp = new Map()) => {
    let copyedData;

    if (typeof data === 'object' && data !== null) {
      const dataValue = mp.get(data);
      if (dataValue) {
        return dataValue;
      }

      mp.set(data, data);
      copyedData = new data.constructor();

      if (Array.isArray(data)) {
        copyedData = data.map((item) => deepCopy3(item, mp));
      } else {
        const normalAttrs = Object.getOwnPropertyNames(data);
        const symbalAttrs = Object.getOwnPropertySymbols(data);
        [...normalAttrs, ...symbalAttrs].forEach((attr) => {
          copyedData[attr] = deepCopy3(data[attr], mp);
        });
      }
    } else {
      copyedData = data;
    }

    return copyedData;
  };

  const deepCopy4 = (data, mp = new Map()) => {
    let copyedData;

    if (typeof data === 'object' && data !== null) {
      const dataValue = mp.get(data);
      if (dataValue) {
        return dataValue;
      }

      mp.set(data, copyedData);
      copyedData = new data.constructor();

      if (Array.isArray(data)) {
        copyedData = data.map((item) => deepCopy4(item, mp));
      } else {
        const reflectKeys = Reflect.ownKeys(data);
        reflectKeys.forEach((attr) => {
          copyedData[attr] = deepCopy4(data[attr], mp);
        });
      }
    } else {
      copyedData = data;
    }

    return copyedData;
  };

  const deepCopy5 = (data, mp = new WeakMap()) => {
    let copyedData;

    if (typeof data === 'object' && data !== null) {
      const dataValue = mp.get(data);
      if (dataValue) {
        return dataValue;
      }

      copyedData = new data.constructor();
      mp.set(data, copyedData);

      if (Array.isArray(data)) {
        copyedData = data.map((item) => deepCopy5(item, mp));
      } else {
        const reflectKeys = Reflect.ownKeys(data);
        reflectKeys.forEach((attr) => {
          copyedData[attr] = deepCopy5(data[attr], mp);

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
  const handleDeepCopy = () => {
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

    // const data = deepCopy(obj);
    // console.log('data: ', data);
    const data1 = deepCopy5(obj);
    obj.temp = '999';
    console.log('data1: ', data1);
    console.log('obj: ', obj);
  };

  return (
    <div>
      <button onClick={handleDeepCopy}>deep copy</button>
    </div>
  );
};

export default DeepCopy;
