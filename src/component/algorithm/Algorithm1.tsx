const Algorithm1 = () => {
  const algorithm1 = (nums: number[], target: number) => {
    let map = new Map();
    for (let i = 0; i < nums.length; i++) {
      const k = target - nums[i];
      if (map.has(k)) {
        return [map.get(k), i];
      }
      map.set(nums[i], i);
    }
    return [];
  };

  const algorithm2 = (nums: number[], target: number) => {
    const result = [];
    let map = new Map();
    for (let i = 0; i < nums.length - 2; i++) {
      for (let j = i + 1; j < nums.length; j++) {
        const innerK = target - nums[i] - nums[j];
        if (map.has(innerK)) {
          result.push([i, map.get(innerK), j]);
          break;
        }
        map.set(nums[j], j);
      }
      map.clear();
    }
    return result;
  };

  return (
    <div>
      <h1>this is Algorithm 1 page</h1>
      <button
        onClick={() => console.log(algorithm1([2, 3, 4, 5, 6, 7, 8, 9, 10], 9))}
      >
        两数之和
      </button>
      <br />
      <button onClick={() => console.log(algorithm2([-1, 0, 1, 2, -1, -4], 0))}>
        三数之和
      </button>
    </div>
  );
};

export default Algorithm1;
