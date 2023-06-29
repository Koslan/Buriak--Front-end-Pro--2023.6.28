
// For hm14
// Task 1
let sum = (function () {
  let memory = 0;
  return function (num) {
    memory += num;
    return memory;
  }
})();

document.getElementById("hm14_task1_button").addEventListener("click", function () {
  let num = Number(document.getElementById("hm14_task1_input").value);
  document.getElementById("hm14_task1_result").value = sum(num);
});

// Task 2
let task2Array = [1, 'test', 2];
let selectedItemTask2 = null;

function hm14_task2_addElement() {
  task2Array.push(document.getElementById('hm14_task2_numberInput').value);
  updateListTask();
}

function hm14_task2_editElement() {
  if (selectedItemTask2 != null) {
    task2Array[selectedItemTask2] = document.getElementById('hm14_task2_numberInput').value;
    updateListTask();
  }
}

function hm14_task2_removeElement() {
  if (selectedItemTask2 != null) {
    task2Array.splice(selectedItemTask2, 1);
    updateListTask();
  }
}

function hm14_task2_calculateAverage(index) {
  selectedItemTask2 = index;
  updateListTask();
}

function updateListTask() {
  let list = document.getElementById("hm14_task2_numberList");
  let listHTML = "";
  task2Array.forEach((number, index) => {
    let itemHTML = `<div class="my-2">
                      <div id="item${index}" class="h5 d-flex justify-content-center">${number}</div>
                      <button onclick="selectElementTask2(${index})" class="btn btn-dark btn-sm mt-2">Select</button>
                    </div>`;
    if (index === selectedItemTask2) {
      itemHTML = `<div class="my-2">
                    <div id="item${index}" class="h5  text-danger d-flex justify-content-center">${number}</div>
                    <button onclick="selectElementTask2(${index})" class="btn btn-dark btn-sm mt-2">Select</button>
                  </div>`;
    }
    listHTML += itemHTML;
  });
  list.innerHTML = listHTML;
}

updateListTask();

function hm14_task2_calculateAverage() {
  if (task2Array.length === 0) {
    alert("Array is empty.");
    return;
  }

  let sum = 0;
  let count = 0;

  for (let elem of task2Array) {
    if (!isNaN(Number(elem))) {
      sum += Number(elem);
      count++;
    }
  }

  let average = count > 0 ? sum / count : 0;
  document.getElementById('hm14_task2_averageResult').value = average;
}

// Task 3
function doMath(x, znak, y) {
  switch (znak) {
    case '+':
      return x + y;
    case '-':
      return x - y;
    case '*':
      return x * y;
    case '/':
      if (y != 0) {
        return x / y;
      } else {
        return "Error! Division by zero is not possible";
      }
    case '%':
      return x % y;
    case '^':
      return pow(x, y);
    default:
      return "Error! Unknown operation";
  }
}

document.getElementById("hm14_task3_button").addEventListener("click", function () {
  let x = Number(document.getElementById("hm14_task3_x").value);
  let y = Number(document.getElementById("hm14_task3_y").value);
  let znak = document.getElementById("hm14_task3_znak").value;

  document.getElementById("hm14_task3_result").value = doMath(x, znak, y);
});

// Task 4
let hm14_task4_array = [];

function hm14_task4_generate2DArray() {
  const mainArrayLength = document.getElementById('hm14_task4_mainArrayLength').value;
  const innerArrayLength = document.getElementById('hm14_task4_innerArrayLength').value;
  const arrayElementValue = document.getElementById('hm14_task4_arrayElementValue').value;

  let array = [];

  for (let i = 0; i < mainArrayLength; i++) {
    let innerArray = [];
    for (let j = 0; j < innerArrayLength; j++) {
      innerArray.push(arrayElementValue);
    }
    array.push(innerArray);
  }
  hm14_task4_array = array;

  displayArray(array);
}

function hm14_task4_generate2DArrayWithRandom() {
  const mainArrayLength = document.getElementById('hm14_task4_mainArrayLength').value;
  const innerArrayLength = document.getElementById('hm14_task4_innerArrayLength').value;

  let array = [];

  for (let i = 0; i < mainArrayLength; i++) {
    let innerArray = [];
    for (let j = 0; j < innerArrayLength; j++) {
      innerArray.push(getRandomInt(-1000, 1000));
    }
    array.push(innerArray);
  }
  hm14_task4_array = array;

  displayArray(array);
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function hm14_task4_showGenerate2DArray() {
  alert(hm14_task4_array);
}

function displayArray(array) {
  const displayArea = document.getElementById('hm14_task4_displayArray');
  displayArea.innerHTML = '';

  array.forEach((innerArray, index1) => {
    let rowHTML = `<div class="row mb-3">`;
    innerArray.forEach((element, index2) => {
      rowHTML += `
        <div class="col">
          <input id="input${index1}-${index2}" type="text" class="form-control" value="${element}" 
                 onchange="updateArrayValue(${index1}, ${index2}, this.value)">
        </div>
      `;
    });
    rowHTML += `</div>`;
    displayArea.innerHTML += rowHTML;
  });
}

function updateArrayValue(index1, index2, value) {
  hm14_task4_array[index1][index2] = value;
}

function validateInput(inputId) {
  let inputField = document.getElementById(inputId);
  let value = inputField.value;

  if (value < 1) {
    inputField.value = 1;
  } else if (value > 12) {
    inputField.value = 12;
  }
}

// Task 5
function removeCharacters(string, chars) {
  let charsArray = chars.split('');
  let result = '';
  for (let char of string) {
    if (!charsArray.includes(char)) {
      result += char;
    }
  }
  return result;
}

document.getElementById("hm14_task5_button").addEventListener("click", function () {
  let arg1 = document.getElementById("hm14_task5_arg1").value;
  let arg2 = document.getElementById("hm14_task5_arg2").value;

  document.getElementById("hm14_task5_result").value = removeCharacters(arg1, arg2);
});

// For hm15
const hm15_addNumber = (() => {
  
  let callCache = [];

  return () => {
    const numberInput = document.getElementById('hm15_numberInput');
    const phoneNumber = `tel: +380${numberInput.value}`;

    if (!callCache.includes(phoneNumber)) {
      callCache.push(phoneNumber);
    }

    while (callCache.length > 10) {
      callCache.shift();
    }

    numberInput.value = '';
    updateResults(callCache);
  };
})();

function updateResults(callCache) {
  const resultArea = document.getElementById('hm15_resultArea');
  resultArea.value = '';
  callCache.forEach(phoneNumber => {
    resultArea.value += `${phoneNumber}\n`;
  });
}


// hm 16

let ladder = {
  step: 0,
  up: function () {
    this.step++;
    return this; 
  },
  down: function () {
    this.step--;
    return this;
  },
  showStep: function () {
    alert(this.step);
    return this; 
  }
};

document.getElementById('hm16_upButton').addEventListener('click', function () {
  ladder.up();
  document.getElementById('hm16_stepResult').innerText = `Step: ${ladder.step}`;
});

document.getElementById('hm16_downButton').addEventListener('click', function () {
  ladder.down();
  document.getElementById('hm16_stepResult').innerText = `Step: ${ladder.step}`;
});

document.getElementById('hm16_showButton').addEventListener('click', function () {
  ladder.showStep();
});


//hm 17
function generateList(array) {
  let ul = document.createElement('ul');

  for (let i = 0; i < array.length; i++) {
    let li = document.createElement('li');

    if (Array.isArray(array[i])) {
      li.appendChild(generateList(array[i]));
    } else {
      li.textContent = array[i];
    }
    ul.appendChild(li);
  }
  return ul;
}

function hm17_generateList() {
  let arrayInput = document.getElementById('hm17_arrayInput');
  let array = JSON.parse(arrayInput.value);

  let resultArea = document.getElementById('hm17_resultArea');
  resultArea.innerHTML = '';
  resultArea.appendChild(generateList(array));
}




// Utility functions

function selectElementTask2(index) {
  selectedItemTask2 = index;
  updateListTask();
}



function loadTabContent(tabId) {
  const tabs = document.getElementsByClassName("tab");
  for (let i = 0; i < tabs.length; i++) {
    tabs[i].style.display = "none";
  }
  document.getElementById(tabId).style.display = "block";
}

loadTabContent("hm14");


function pow(num, degree) {
  if (degree === 0) {
    return 1;
  }
  return num * pow(num, degree - 1);
}

document.getElementById("task-select").addEventListener("change", (event) => {
  loadTabContent(event.target.value);
});

window.onload = function () {
  const currentPageUrl = window.location.href;
  const username = currentPageUrl.split("/")[2].split(".")[0];
  const repoName = currentPageUrl.split("/")[3];
  const githubRepoUrl = `https://github.com/${username}/${repoName}`;

  document.getElementById("github-link").href = githubRepoUrl;
};
