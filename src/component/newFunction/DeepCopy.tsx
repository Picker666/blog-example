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

  const handleDeepCopy = () => {
    const obj = {
      name: '微信公众号: Code程序人生',
      age: 22,
      sex: '男',
      hobby: ['跑步', '读书', '睡觉'],
      fn: function () {
        console.log(this.name);
      },
      time: new Date(),
      reg: new RegExp(/D{9,19}/gi),
    };

    const obj1 = {};

    obj.obj1 = obj1;
    obj1.obj = obj;

    // const data = deepCopy(obj);
    // console.log('data: ', data);
    const data1 = deepCopy2(obj);
    console.log('data1: ', data1);
  };

  return (
    <div>
      <button onClick={handleDeepCopy}>deep copy</button>
    </div>
  );
};

export default DeepCopy;
