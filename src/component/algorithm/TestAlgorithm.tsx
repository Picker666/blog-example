const Home = () => {
  const mergeArray = (nums1, m, nums2, n) => {
    let i = 0,
      j = 0,
      temp = [];
    while (i < m && j < n) {
      if (nums1[i] < nums2[j]) {
        temp.push(nums1[i]);
        i++;
      } else {
        temp.push(nums2[j]);
        j++;
      }
    }
    while (i < m) {
      temp.push(nums1[i]);
      i++;
    }
    while (j < n) {
      temp.push(nums2[j]);
      j++;
    }
    nums1 = temp;
    console.log('temp: ', nums1);
  };

  const mergeArray1 = (nums1, m, nums2, n) => {
    let i = m - 1,
      j = n - 1,
      index = n + m - 1;
    while (i >= 0 && j >= 0) {
      if (nums1[i] < nums2[j]) {
        nums1[index] = nums2[j];
        j--;
      } else {
        nums1[index] = nums1[i];
        i--;
      }
      index--;
    }
    while (i >= 0) {
      nums1[index] = nums1[i];
      i--;
      index--;
    }
    while (j >= 0) {
      nums1[index] = nums2[j];
      j--;
      index--;
    }
    console.log('temp: ', nums1);
  };

  // mergeArray([1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3);
  mergeArray1([1, 2, 3, 0, 0, 0], 3, [4, 5, 6], 3);

  return (
    <div>
      <h1>this is home page</h1>
    </div>
  );
};

export default Home;
