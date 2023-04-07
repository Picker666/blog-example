const Palindrome = () => {
  const palindrome = (str: string) => {
    if (str.length < 2) {
      return false;
    }

    let i = 0,
      j = str.length - 1;

    const reg = /[a-zA-Z]/;
    let result = true;

    while (result && i < j) {
      if (reg.test(str[i]) && reg.test(str[j])) {
        result = str[i].toLocaleUpperCase() === str[j].toLocaleUpperCase();
      } else {
        result = str[i] === str[j];
      }
      i++;
      j--;
    }
    console.log(result);
  };

  function levelOrder(root) {
    let result = [];
    // write code here
    const { left, right, val } = root;
    result.push([val]);

    let child = [];
    if (left !== null) {
      const leftChild = levelOrder(left);
      child = leftChild[0];
      if (leftChild[1]) {
        child.push(leftChild[1]);
      }
    }

    if (right !== null) {
      const rightChild = levelOrder(right);
      if (child[0]) {
        child[0] = [...child, ...rightChild[0]];
      }
      if (rightChild[1]) {
        if (child[1] === undefined) {
          child[1] = [];
        }
        child[1] = [...child[1], ...rightChild[1]];
      }
    }

    if (child.length) {
      result = [...result, ...child];
    }

    return result;
  }

  const result = levelOrder({
    val: 3,
    left: {
      val: 9,
      left: null,
      right: null,
    },
    right: {
      val: 20,
      left: {
        val: 15,
        left: null,
        right: null,
      },
      right: {
        val: 7,
        left: null,
        right: null,
      },
    },
  });

  console.log(result, "================");

  palindrome("f.dadaD.f");

  return (
    <div>
      <h1>this is Palindrome page</h1>
    </div>
  );
};

export default Palindrome;
