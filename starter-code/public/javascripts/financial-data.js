const fromInput = document.querySelector("#from")
const toInput = document.querySelector("#to")

const getData = (from, to) => {
  axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${from}&end=${to}`)
    .then(response => {
      theValues(response.data.bpi)
    })
    .catch(error => console.log(error))
}

fromInput.onchange = () => getData(fromInput.value, toInput.value)
toInput.onchange = () => getData(fromInput.value, toInput.value)

axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json`)
  .then(response => {
    theValues(response.data.bpi)
    console.log(response.data)
  })
  .catch(error => console.log(error))


const theValues = bitcoinData => {

  const dates = Object.keys(bitcoinData)
  const values = Object.values(bitcoinData)

  const ctx = document.getElementById('Grafico-Canvas').getContext('2d');
  new Chart(
    ctx,
    {
      type: 'line',
      data: {
        labels: dates,
        datasets: [{
          label: "Bitcoin evolution",
          backgroundColor: '#1F618D',
          borderColor: "#D4AC0D",
          data: values,
        }]
      }
    });
};