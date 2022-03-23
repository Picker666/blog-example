const Sorting = () => {
  const arr: number[] = [10, 4, 6, 2, 1, 8, 7, 3, 9, 5]

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

  function insertSorting(array: number[]) {
    let j, temp
    for (let i = 1; i < array.length; i++) {
      temp = array[i]
      for (j = i - 1; j >= 0 && array[j] > temp; j--) {
        array[j + 1] = array[j]
      }
      array[j + 1] = temp

      console.log(`插入排序======${i}=====`, array)
    }
    console.log(`插入排序===result===`, array)
  }
  // const arr: number[] = [2, 4, 6, 1, 10, 8, 7, 3, 9, 5]
  // left: 0, right: 4, mid: 2
  function mergeSort(array: number[], left: number, right: number) {
    if (left == right) {
      return
    }
    let mid = Math.floor((left + right) / 2)
    mergeSort(array, left, mid) //左边递归求解
    mergeSort(array, mid + 1, right) //右边递归求解

    let tempArray = new Array(array.length)
    let i = left //0
    let j = mid + 1 //3
    let k = left
    while (i <= mid || j <= right) {
      //当右区间比较完毕，或者左区间的值存在并且比右区间的值小
      if (j > right || (i <= mid && array[i] < array[j])) {
        tempArray[k++] = array[i++] //将左区间的值放入临时数组中
      } else {
        tempArray[k++] = array[j++] //右区间的值存在，且比左区间的值小，放入临时数组中
      }
    }

    //将临时数组中的值拷贝到原来数组中
    for (k = left; k <= right; k++) {
      array[k] = tempArray[k]
    }
    console.log(`二路归并排序===result===`, array, 'tempArray', tempArray)
  }
  // const arr: number[] = [2, 4, 6, 1, 10, 8, 7, 3, 9, 5]
  function quickSort(array: number[], left: number, right: number) {
    if (left >= right) {
      //如果left >= right就说明已经整理完一个组
      return
    }
    let i = left
    let j = right
    let temp = array[left] //找出一个枢纽存储值
    while (i < j) {
      while (i < j && array[j] >= temp) {
        j--
      }
      array[i] = array[j]
      while (i < j && array[i] <= temp) {
        i++
      }
      array[j] = array[i]
    }
    array[i] = temp

    console.log(`快速排序===result===`, array)

    quickSort(array, left, i) //左边递归
    quickSort(array, i + 1, right) //右边递归
  }

  // bubbleSort(arr)
  // changeSort(arr)
  // insertSorting(arr)
  mergeSort(arr, 0, arr.length - 1)
  // quickSort(arr, 0, arr.length - 1)

  return <div>this is Sorting page</div>
}

export default Sorting
