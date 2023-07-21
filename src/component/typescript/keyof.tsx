
const KeyOf = () => {

  const handler = () => {
    // keyof
    type KeyOfType = {
      name: string;
      age: number;
    };

    // eslint-disable-next-line prettier/prettier
    type uniteType = keyof KeyOfType;

    let nameStr: uniteType = 'name';
    nameStr = 'age';
    // nameStr = 'p'; // 不能将类型“"p"”分配给类型“keyof KeyOfType”。ts(2322)
    console.log('nameStr: ', nameStr);

    // valueof;

    type ValueOfType<T extends Record<string, any>> = T[keyof T];
    // type valueOfType1<T extends Record<string, any>> = { [P in keyof T]: T[P] };

    type uniteValueType = ValueOfType<KeyOfType>;
    let value: uniteValueType = 'string';
    value = 'number';
    value = 'any';
    console.log('value: ', value);
  };

  return (
    <div>
      this is a page for keyof
      <button onClick={handler}>按钮</button>
    </div>
  );
};

export default KeyOf;
