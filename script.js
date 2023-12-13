let bars = [];

function createBars(size) {
  const barsContainer = document.getElementById("barsContainer");
  barsContainer.innerHTML = "";

  for (let i = 0; i < size; i++) {
    const value = Math.floor(Math.random() * 100) + 1;
    const bar = document.createElement("div");
    bar.style.height = `${value * 3}px`;
    bar.classList.add("bar");
    bars.push({ value, element: bar });
    barsContainer.appendChild(bar);
  }
}

function randomizeArray() {
  bars.sort(() => Math.random() - 0.5);
  updateBars();
}

function updateBars() {
  console.log("udate bars called");
  const barsContainer = document.getElementById("barsContainer");
  barsContainer.innerHTML = "";
  bars.forEach((barObj) => barsContainer.appendChild(barObj.element));
}

function insertionSort() {
  const len = bars.length;
  for (let i = 1; i < len; i++) {
    let key = bars[i];
    let j = i - 1;

    while (j >= 0 && bars[j].value > key.value) {
      bars[j + 1] = bars[j];
      j = j - 1;
    }
    bars[j + 1] = key;
  }
  updateBars();
  console.log("insersion");
}

function selectionSort() {
  const len = bars.length;
  for (let i = 0; i < len - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < len; j++) {
      if (bars[j].value < bars[minIdx].value) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      const temp = bars[i];
      bars[i] = bars[minIdx];
      bars[minIdx] = temp;
    }
  }
  updateBars();
  console.log("selection");
}

function bubbleSort() {
  const len = bars.length;
  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      if (bars[j].value > bars[j + 1].value) {
        const temp = bars[j];
        bars[j] = bars[j + 1];
        bars[j + 1] = temp;
      }
    }
  }
  updateBars();
  console.log("Bubble Sort");
}

function quickSort() {
  function partition(low, high) {
    const pivot = bars[high].value;
    let i = low - 1;
    for (let j = low; j < high; j++) {
      if (bars[j].value < pivot) {
        i++;
        const temp = bars[i];
        bars[i] = bars[j];
        bars[j] = temp;
      }
    }
    const temp = bars[i + 1];
    bars[i + 1] = bars[high];
    bars[high] = temp;
    return i + 1;
  }

  function sort(low, high) {
    if (low < high) {
      const pi = partition(low, high);
      sort(low, pi - 1);
      sort(pi + 1, high);
    }
  }

  const len = bars.length;
  sort(0, len - 1);
  updateBars();
  console.log("Quick Sort");
}

function shellSort() {
  const len = bars.length;
  for (let gap = Math.floor(len / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < len; i++) {
      const temp = bars[i];
      let j;
      for (j = i; j >= gap && bars[j - gap].value > temp.value; j -= gap) {
        bars[j] = bars[j - gap];
      }
      bars[j] = temp;
    }
  }
  updateBars();
  console.log("Shell Sort");
}

function mergeSort() {
  function merge(left, mid, right) {
    const n1 = mid - left + 1;
    const n2 = right - mid;

    const L = new Array(n1);
    const R = new Array(n2);

    for (let i = 0; i < n1; ++i) L[i] = bars[left + i];
    for (let j = 0; j < n2; ++j) R[j] = bars[mid + 1 + j];

    let i = 0;
    let j = 0;
    let k = left;

    while (i < n1 && j < n2) {
      if (L[i].value <= R[j].value) {
        bars[k] = L[i];
        i++;
      } else {
        bars[k] = R[j];
        j++;
      }
      k++;
    }

    while (i < n1) {
      bars[k] = L[i];
      i++;
      k++;
    }

    while (j < n2) {
      bars[k] = R[j];
      j++;
      k++;
    }
  }

  function mergeSortHelper(left, right) {
    if (left >= right) return;

    const mid = Math.floor(left + (right - left) / 2);
    mergeSortHelper(left, mid);
    mergeSortHelper(mid + 1, right);
    merge(left, mid, right);
  }

  const len = bars.length;
  mergeSortHelper(0, len - 1);
  updateBars();
  console.log("Merge Sort");
}

function changeSize() {
  const newSize = bars.length - 5;
  bars = [];
  createBars(newSize);
}

createBars(25);
