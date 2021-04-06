export function swap(array: any[], a: number, b: number) {
  const temp = array[a];
  array[a] = array[b];
  array[b] = temp;
}

function rotateArray(array: any[], pivot: any) {
  array = [...array];
  for (let i = 0; i < array.length; i++) {
    if (array[0] === pivot) {
      break;
    }
    for (let j = 0; j < array.length - 1; j++) {
      swap(array, j, j + 1);
    }
  }
  return array;
}

export default rotateArray;
