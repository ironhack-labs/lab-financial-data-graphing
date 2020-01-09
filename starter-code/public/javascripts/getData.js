// coinDesk required endPoint
import {getData} from './coindesk.js';
import {drawLineChart} from './drawLineChart.js';
import curr from './supported-currencies.js';
const {currencies} = curr;

let pathParams = undefined;

// sort by last word
currencies.sort((a, b) =>
  a.country
    .split(' ')
    [a.country.split(' ').length - 1].localeCompare(
      b.country.split(' ')[b.country.split(' ').length - 1]
    )
);

// get currencies Array and insert in as option of a <datalist> form
const parentElement = document.getElementById('curr');
const optionElementValuesArr = [];
currencies.forEach((e) => {
  const optionElement = document.createElement('option');
  const {country, currency} = e;
  optionElement.setAttribute('value', country);
  optionElementValuesArr.push(optionElement.value)
  optionElement.setAttribute('currencyCode', currency);
  parentElement.appendChild(optionElement);
});

const ctx = document.getElementById('chart').getContext('2d');
const data = getData();
drawLineChart(ctx, data);

// update data after start and end data query string "submit"
// nao realmente precisa do async aqui, acredito
document.getElementById('update-chart').addEventListener('click', async (event) => {
  const startDate = document.getElementById('startDate').value;
  const endDate = document.getElementById('endDate').value;
  if (startDate && endDate) {
    const data = await getData(undefined, `?start=${startDate}&end=${endDate}`);
    console.log('o que volta desse data?', data)
    drawLineChart(ctx, data);
  } else {
    console.log('preencha ambos os campos!');
  }
});

const currencyInputElement = document.getElementById('currencyInput');

// prevent onKeyDown enter submmit
// https://stackoverflow.com/questions/43184088/prevent-enter-keypress-form-submission-but-not-datalist-selction
// TODO: queria entender como escrever isso sem precisar do this. Como acessar outros Elements sem o this? Como atravessar o dom a partir de um elemento?
// remove
currencyInputElement.addEventListener('keydown', function(e) {
  // console.log(this.form)
  if (e.keyCode == 13 && typeof this.form != 'undefined') {
    this.form.addEventListener(
      'submit',
      function(e) {
        e.preventDefault();
      },
      {once: true}
    );
  }
});

// update data after currency selection match
// add event listener on click and onkeydown on every element
// https://stackoverflow.com/questions/30022728/perform-action-when-clicking-html5-datalist-option
currencyInputElement.addEventListener('input', async (event) => {
  // console.log(event.target.currencyCode);
  const value = event.target.value;
  for (let i = 0; i < optionElementValuesArr.length; i += 1) {
    if(value === optionElementValuesArr[i]) {
      // FIXME: Acessar o código aqui dentro e passar como variável!
      // FIXME: precisa de uma getData diferente! o BPI do currentprice retorna rate, não retorna o array completo.
      pathParams = `/currentprice/EUR.json`
      const data = await getData(pathParams);
      // console.log('E dessa aqui?', data);
      drawLineChart(ctx, data);
      // console.log(`oi, ${value} caralho!`)
      break
    }
  }
});

// optionElementValuesArr

// pega o valor do elemento que disparou o input
// pega todos optionElements
// para cada elemento num array de optionsElement
// checa se elemento val = val

// loga um item foi selecionado!
// callback!
