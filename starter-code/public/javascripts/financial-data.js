//const axios = require('axios');




const setChart =  async (start, end,currency) => {
    const b = await axios.get(
    `https://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}&currency=${currency}`
  );

  const Datos=b.data.bpi;

const value=[]
const dates=[]

  for (const prop in Datos) {
      value.push(Datos[prop])
      dates.push(prop);

  }

  const Max=Math.max(...value)
  const Min=Math.min(...value)


document.querySelector('#maxValue').value=`${Max}`;
document.querySelector('#minValue').value=`${Min}`;


  var ctx = document.getElementById('myChart').getContext('2d');


const firstDate=document.querySelector('.firstDate')
console.log(firstDate)

  //console.log(b.data.bpi);



  

var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: dates,
        datasets: [{
            label: 'My First dataset',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: value
        }]
    },

    // Configuration options go here
    options: {}
});

};


function update() {
    const $inputValue1 = document.querySelector('#firstDate').value
    const $inputValue2 = document.querySelector('#secondDate').value
    const $inputValue3 = document.querySelector('#curr').value
setChart( $inputValue1, $inputValue2, $inputValue3)

}

const $button = document.querySelector('button')
$button.addEventListener('click', update)