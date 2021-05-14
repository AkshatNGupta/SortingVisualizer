import React from 'react';
import { getMergeSortAnimations } from '../sortingAlgorithms/mergeSort.js';
import { getQuickSortAnimations } from '../sortingAlgorithms/quickSort.js';
import { getBubbleSortAnimations } from '../sortingAlgorithms/bubbleSort.js';
import { getHeapSortAnimations } from '../sortingAlgorithms/heapSort.js';
import { getInsertSortAnimations } from '../sortingAlgorithms/insertSort.js';
import { getSelectSortAnimations } from '../sortingAlgorithms/selectSort.js';
import { getRadixSortAnimations } from '../sortingAlgorithms/radixSort.js';
import { getBucketSortAnimations } from '../sortingAlgorithms/bucketSort.js';
import './SortingVisualizer.css';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 3;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 200;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'indianred';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'gold';

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, 500));
    }
    this.setState({ array });
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  quickSort() {
    const animations = getQuickSortAnimations(this.state.array);
    console.log(animations);
    // We leave it as an exercise to the viewer of this code to implement this method.
  }

  heapSort() {
    const animations = getHeapSortAnimations(this.state.array);
    // We leave it as an exercise to the viewer of this code to implement this method.
  }

  bubbleSort() {
    const animations = getBubbleSortAnimations(this.state.array);
    // We leave it as an exercise to the viewer of this code to implement this method.
  }

  insertSort() {
    const animations = getInsertSortAnimations(this.state.array);
    // We leave it as an exercise to the viewer of this code to implement this method.
  }

  selectSort() {
    const animations = getSelectSortAnimations(this.state.array);
    // We leave it as an exercise to the viewer of this code to implement this method.
  }

  radixSort() {
    const animations = getRadixSortAnimations(this.state.array);
    // We leave it as an exercise to the viewer of this code to implement this method.
  }

  bucketSort() {
    const animations = getBucketSortAnimations(this.state.array);
    // We leave it as an exercise to the viewer of this code to implement this method.
  }

  // NOTE: This method will only work if your sorting algorithms actually return
  // the sorted arrays; if they return the animations (as they currently do), then
  // this method will be broken.
  testSortingAlgorithms() {
    for (let i = 0; i < 100; i++) {
      const array = [];
      const length = randomIntFromInterval(1, 1000);
      for (let i = 0; i < length; i++) {
        array.push(randomIntFromInterval(-1000, 1000));
      }
      const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
      const mergeSortedArray = getMergeSortAnimations(array.slice());
      console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
    }
  }

  render() {
    const { array } = this.state;

    return (
      <div className="array-container">
        <div className="btn-container">
          <button className="mybtn" onClick={() => this.resetArray()}>Generate New Array</button>
          <button className="mybtn" onClick={() => this.mergeSort()}>Merge Sort</button>
          <button className="mybtn" onClick={() => this.quickSort()}>Quick Sort</button>
          <button className="mybtn" onClick={() => this.heapSort()}>Heap Sort</button>
          <button className="mybtn" onClick={() => this.bubbleSort()}>Bubble Sort</button>
          <button className="mybtn" onClick={() => this.bucketSort()}>Bucket Sort</button>
          <button className="mybtn" onClick={() => this.selectSort()}>Selection Sort</button>
          <button className="mybtn" onClick={() => this.insertSort()}>Insertion Sort</button>
          <button className="mybtn" onClick={() => this.radixSort()}>Radix Sort</button>
          {/* <button className="mybtn" onClick={() => this.testSortingAlgorithms()}>Test Sorting Algorithms</button> */}
        </div>
        <div className="boxing">{
          array.map((value, idx) => (
            <div className="array-bar" key={idx} style={{ backgroundColor: PRIMARY_COLOR, height: `${value}px`,}}></div>
          ))}
        </div>
        <div className="footer"><h2>Made By - Akshat Narayan Gupta</h2></div>
      </div>
    );
  }
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) {
      return false;
    }
  }
  return true;
}