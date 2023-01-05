// document.addEventListener(
//   "DOMContentLoaded",
//   () => {
//     console.log("lab-financial-data-graphing JS imported successfully!");
//   },
//   false
// );

const reloadButton = document.getElementById('reload');
const startInput = document.getElementById('start');
const endInput = document.getElementById('end');
const currencyInput = document.getElementById('currency');

printChart(startInput.value, endInput.value, currencyInput.value);

reloadButton.addEventListener('click', () => {
  printChart(startInput.value, endInput.value, currencyInput.value);
})