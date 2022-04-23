const MaxDuplication = () => {
  const maxDuplication = (str: string) => {
    if (str.length === 1) {
      return str;
    }

    const charObj = {};
    for (let i of Object.keys(str)) {
      const current = str[i];
      if (charObj[current] === undefined) {
        charObj[current] = 1;
      } else {
        charObj[current]++;
      }
    }
    let maxChar = '',
      maxNum = 0;

    for (let i of Object.keys(charObj)) {
      const current = charObj[i];
      if (current > maxNum) {
        maxNum = current;
        maxChar = i;
      }
    }

    console.log(maxChar, '=======', maxNum);
  };

  const maxDuplication2 = (str: string) => {
    if (str.length === 1) {
      return str;
    }

    let maxChar = '',
      maxNum = 0;

    const charObj = {};
    for (let i of Object.keys(str)) {
      const current = str[i];
      if (charObj[current] === undefined) {
        charObj[current] = 1;
      } else {
        charObj[current]++;
      }

      if (charObj[current] > maxNum) {
        maxChar = current;
        maxNum = charObj[current];
      }
    }

    console.log(maxChar, '=======', maxNum);
  };

  return (
    <div>
      <h1>this is Max Duplication page</h1>
      <button
        onClick={() => {
          maxDuplication('fdadsf');
        }}
      >
        Max Duplication
      </button>
      <button
        onClick={() => {
          maxDuplication2('fdadsf');
        }}
      >
        Max Duplication2
      </button>
    </div>
  );
};

export default MaxDuplication;
