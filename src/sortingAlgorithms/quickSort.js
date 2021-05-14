export function getQuickSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  console.log(array);
  quickSortHelper(array, 0, array.length - 1, animations);
  // quickSortHelper(array, 0, array.length - 1);
  return animations;
}

function quickSortHelper(mainArray,startIdx,endIdx,animations) {
// function quickSortHelper(mainArray,startIdx,endIdx) {
  if (startIdx === endIdx) return;
  const piIdx = partition(mainArray , startIdx, endIdx, animations);
  quickSortHelper(mainArray, startIdx, piIdx, animations);
  quickSortHelper(mainArray, piIdx + 1, endIdx, animations);
  // console.log(mainArray);
  // const piIdx = partition(mainArray , startIdx, endIdx);
  // quickSortHelper(mainArray, startIdx, piIdx);
  // quickSortHelper(mainArray, piIdx + 1, endIdx);
}

function partition(mainArray,startIdx,endIdx,animations){
// function partition(mainArray,startIdx,endIdx) {
  let pivot = mainArray[endIdx-1];
  let i = startIdx-1;
  for (let j = startIdx; j <= endIdx - 1; j++) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, j]);
    if (mainArray[j] < pivot) {
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      i++;
      animations.push([i, mainArray[i]]);
      let temp=mainArray[i];
      mainArray[i]=mainArray[j];
      mainArray[j]=temp;
      // mainArray[k++] = mainArray[i++];
    }
      let temp=mainArray[i+1];
      mainArray[i+1]=mainArray[endIdx];
      mainArray[endIdx]=temp;
      return (i + 1);
  }
}
