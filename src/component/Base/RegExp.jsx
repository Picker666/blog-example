const RegExp = () => {
  const handler1 = () => {
    let a = '01-75855';
    let reg = /(\d{1,}-)(\d{5})/;
    let result = a.match(reg);
    console.log('result: ', result); // [01-75855,01-,75855]

    reg = /(?:\d{1,}-)(\d{5})/;
    result = a.match(reg);
    console.log('result: ', result); // [01-75855, 75855]

    a = '2020/01/02';
    reg = /(\d{4})\/(\d{2})\/(\d{2})/;
    result = a.match(reg);
    console.log('result: ', result); // [2020/01/02, 2020, 01, 02]
  };

  const handler2 = () => {
    let a = 'otto';
    let reg = /(\w)(\w)\2\1/;
    let result = a.match(reg);
    console.log('result: ', result); // ["otto","o","t"]

    a = 'warrandice';
    result = a.match(reg);
    console.log('result: ', result); // ['arra', 'a', 'r']
  };

  /**
   *  至少一个大写字母
      至少一个小写字母
      至少一个数字
      至少8个字符
   */
  const handler3 = () => {
    let a = 'Admin123456';
    let reg = /(?=\w*[a-z])(?=\w*[A-Z])(?=\w*\d)\w{8,}/;
    let result = a.match(reg);
    console.log('result: ', result, reg.test(a)); // ["Admin123456"] true

    a = 'admin123456';
    result = a.match(reg);
    console.log('result: ', result, reg.test(a)); // null false

    a = 'Admin12';
    result = a.match(reg);
    console.log('result: ', result, reg.test(a)); // null false
  };

  const handler4 = () => {
    let a = 'abc@sina.com';
    let reg = /\w{1,}@(?!qq)\w{3,}\.com/;
    let result = a.match(reg);
    console.log('result: ', result, reg.test(a)); // ["abc@sina.com"] true

    a = 'test@qq.com';
    result = a.match(reg);
    console.log('result: ', result, reg.test(a)); // null true
  }

  const handler5 = () => {
    let a = 'Admin123456';
    let reg = /\w{8,}(?<=[a-z]\w*)(?<=[A-Z]\w*)(?<=\d\w*)/;
    let result = a.match(reg);
    console.log('result: ', result, reg.test(a));

    a = 'admin123456';
    result = a.match(reg);
    console.log('result: ', result, reg.test(a)); // null false

    a = 'Admin12';
    result = a.match(reg);
    console.log('result: ', result, reg.test(a)); // null false
  }

  const handler6 = () => {
    let a = '3.1Windows';
    let reg = /(?<!95|98|NT|2000)Windows/;
    let result = a.match(reg);
    console.log('result: ', result, reg.test(a)); // ["Windows"] true

    reg = /.*(?<!95|98|NT|2000)Windows/;
    result = a.match(reg);
    console.log('result: ', result, reg.test(a)); // ["3.1Windows"] true
  }

  const handler7 = () => {
    let a = '1234567890.88';
    let reg = /(?=(\B\d{3})+(\.|$))/g;
    let result = a.replace(reg, ',');
    console.log('result: ', result);
  }

  return (
    <div>
      <p>非捕获分组：</p>
      <button onClick={handler1}>1、非捕获分组...</button>
      <p>回溯分组：</p>
      <button onClick={handler2}>2、回溯...</button>
      <p>正向先行断言</p>
      <button onClick={handler3}>3、正向先行断言...</button>
      <p>反向先行断言</p>
      <button onClick={handler4}>4、反向先行断言...</button>
      <p>正向后行断言</p>
      <button onClick={handler5}>5、正向后行断言...</button>
      <p>反向后行断言</p>
      <button onClick={handler6}>6、反向后行断言...</button>
      <p>千分符</p>
      <button onClick={handler7}>7、千分符...</button>
    </div>
  )
};

export default RegExp;
