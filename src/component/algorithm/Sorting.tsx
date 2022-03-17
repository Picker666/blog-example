const Sorting = () => {
  const arr: number[] = [2, 4, 6, 1, 10, 8, 7, 3, 9, 5]

  function bubbleSort(array: number[]) {
    let temp
    let changed = true //降低排序无用次数
    for (let i = 0; i < array.length - 1 && changed; i++) {
      changed = false
      for (let j = 0; j < array.length - i - 1; j++) {
        if (array[j] > array[j + 1]) {
          temp = array[j]
          array[j] = array[j + 1]
          array[j + 1] = temp
          changed = true
        }
      }
      console.log(`冒泡排序======${i}=====`, array)
    }
    console.log(`冒泡排序===result===`, array)
  }

  function changeSort(array: number[]) {
    let temp
    for (let i = 0; i < array.length - 1; i++) {
      for (let j = i + 1; j < array.length; j++) {
        if (array[i] > array[j]) {
          temp = array[i]
          array[i] = array[j]
          array[j] = temp
        }
      }
      console.log(`选择排序======${i}=====`, array)
    }
    console.log(`选择排序===result===`, array)
  }

  // bubbleSort(arr)
  changeSort(arr)

  return <div>this is Sorting page</div>
}

export default Sorting
