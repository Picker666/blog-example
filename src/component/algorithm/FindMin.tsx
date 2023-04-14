/**
 * 米小游拿到了一个字符串，她想截取一个连续子串，使得该子串中包含至少k个连续的“mihoyo”。你可以帮米小游求出最短的子串长度，以及对应的子串位置吗？
输入描述：
第一行输入两个正整数n和k，用空格隔开。
第二行输入一个长度为n的、仅由小写字母组成的字符串。
1≤k≤n≤200000
输出描述：
如果不存在这样一个连续子串，请输出-1。
否则输出两个正整数l，r，代表选取的子串的左下标和右下标(整个字符串左下标为0，右下标为n-1）。
请务必保证选择的连续子串包含至少k个"mihoyo"，且长度是最短的。有多解时输出任意即可。

input:
22 2
mihoyoyomihoyomimihoyo
 * 
 */

const FindMin = () => {
  const m = 'mihoyoyomihoyomimihoyo';
  const handleClick = (k) => {
    const matched = m.match(/mihoyo/g) || [];
    if (matched.length < k) {
      return -1;
    }

    const arr = m.split('mihoyo');

    if (k === 1) {
      const start = arr[0].length;
      return [start, start + 5];
    }

    const dataMap = new Map();
    let min = 200001;
    for (let i = 0; i <= matched.length - k; i++) {
      let strLength = 0;
      for (let j = 0; j < k - 1; j++) {
        strLength += arr[i + j + 1].length;
      }
      strLength += 6 * k;
      if (min > strLength) {
        dataMap.set(strLength, i);
        min = strLength;
      }
    }
    const index = dataMap.get(min);

    const start = arr.slice(0, index + 1).reduce((res, a) => res + a.length, 0) + index * 6;

    return [start, start + min - 1];
  };

  return (
    <div>
      <button onClick={() => console.log(handleClick(2))}>goo</button>
    </div>
  );
};

export default FindMin;
