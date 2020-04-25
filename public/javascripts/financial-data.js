// jshint esversion:6

// THE DOM MANIPULATION DOES NOT WORK

// Iteration #1: Get data
function getBPIData(from, to, currency) {
  let apiUrl = "";
  if (from && to && currency === true) {
    apiUrl = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${from}&end=${to}&currency=${currency}`;
  } else {
    apiUrl = `http://api.coindesk.com/v1/bpi/historical/close.json`;
  }
  axios
    .get(apiUrl)
    .then((answer) => {
      const keys = Object.keys(answer.data.bpi);
      const values = Object.values(answer.data.bpi);

      drawCanvas(keys, values);

      setFromToDates();

      setCurrency();

      setMinMax(values);
    })
    .catch((error) => {
      console.log("Error while getting the data from the API: ", error);
    });
}

let from = document.querySelector("#from").value;
let to = document.querySelector("#to").value;
let currency = document.querySelector("#currency").value;

getBPIData(from, to, currency);

// Iteration #2: Create a chart
function drawCanvas(labels, data) {
  const ctx = document.getElementById("myChart").getContext("2d");

  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Bitcoin Price Index Chart",
          backgroundColor: "rgb(255, 99, 132, 0.3)",
          borderColor: "rgb(255, 99, 132)",
          data: data,
        },
      ],
    },
  });
}

function callEverything() {
  from = document.querySelector("#from").value;
  to = document.querySelector("#to").value;
  currency = document.querySelector("#currency").value;

  getBPIData(from, to, currency);
}

// Iteration #3: Dates Filter
function setFromToDates() {
  const inputDates = document.querySelectorAll("input");
  console.log(inputDates);
  inputDates.forEach((input) => {
    input.addEventListener("change", callEverything);
  });
}

// Iteration #4 (Bonus): Currency
function setCurrency() {
  let selectCurrency = document.querySelector("select");
  console.log(selectCurrency);
  selectCurrency.addEventListener("change", callEverything);
}

// Iteration #5 (Bonus): Max/Min Values
function setMinMax(arr) {
  document.querySelector("#max").innerHTML = Math.max(...arr);
  document.querySelector("#min").innerHTML = Math.min(...arr);
}

// const start = "2013-09-01";
// const end = "2013-09-10";
// const currency = "HUF";
// const apiUrl = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}&currency=${currency}`;

// axios
//   .get(apiUrl)
//   .then((responseFromAPI) => {
//     // console.log('The response from API: ', Object.values(responseFromAPI.data.bpi));
//     printTheChart(responseFromAPI.data);
//   })
//   .catch((error) => {
//     console.log("Error while getting the data from the API: ", error);
//   });

// // Iteration #2: Create a chart
// function printTheChart(bpiData) {
//   const bpiDates = Object.keys(bpiData.bpi); // Array
//   const bpiValues = Object.values(bpiData.bpi); // Array
//   //const bpiFirstValue = bpiData.pbi["2020-03-23"];
//   console.log("bpiDates ", bpiDates);
//   console.log("bpiValues ", bpiValues);

//   const ctx = document.getElementById("myChart").getContext("2d");

//   const chart = new Chart(ctx, {
//     type: "line",
//     data: {
//       labels: bpiDates,
//       datasets: [
//         {
//           label: "Bitcoin Price Index Chart",
//           backgroundColor: "rgb(255, 99, 132)",
//           borderColor: "rgb(255, 99, 132)",
//           data: bpiValues,
//         },
//       ],
//     },
//   });
// }

// Iteration #3: Dates Filter
// function changeFromTo() {
//   const from = document.querySelector("#from").innerHTML;
//   const to = document.querySelector("#to").innerHTML;
// }

// Iteration #4 (Bonus): Currency
// function changeCurrency() {
//   const usd = document.querySelector("#currency > option:nth-child(2)")
//     .innerHTML;
//   const eur = document.querySelector("#currency > option:nth-child(3)")
//     .innerHTML;
//   const huf = document.querySelector("#currency > option:nth-child(4)")
//     .innerHTML;
// }

// Iteration #5 (Bonus): Max/Min Values
// function setMinMax() {
//   const max = document.querySelector("#max").innerHTML;
//   const min = document.querySelector("#min").innerHTML;
// }

// TESTS
// from = document.querySelector("#from").innerHTML;
// console.log(document.querySelector("#from").innerHTML);
// document.querySelector("#currency > option:nth-child(2)").innerHTML = currency;
// console.log(
//   document.querySelector("#currency > option:nth-child(2)").innerHTML
// );
// const max = document.querySelector("#max").innerHTML;
// console.log(max);
