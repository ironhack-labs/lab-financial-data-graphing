const dateStart = document.querySelector('.startDate').value
const dateEnd = document.querySelector('.endDate').value
const currency = document.querySelector('#currency').value
console.log(dateStart)
console.log(dateEnd)

const apiURL = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${dateStart}&end=${dateEnd}&currency=${currency}`

// async function getAll(){
//   try{
//     const {data} = await axios.get(apiURL);
//     console.log("data:", data)
//   } catch(e){
//     console.error(e)
//   }
// }

async function showChart(url){
  try{
    const {data} = await axios.get(url);
    const currentBTC = data['bpi'];
    const btcLabels = Object.keys(currentBTC);
    const btcValues = Object.values(currentBTC);
    const ctx = document.querySelector('.my-canvas').getContext('2d');
    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: btcLabels,
        datasets: [
          {
            label: "BitCoin Price Index",
            backgroundColor: "rgba(200,200,200,0.7)",
            borderColor: "rgba(0,200,200,0.5)",
            data: btcValues
          },
        ],
      },
    });
    console.log(btcValues)
    const max = Math.max(...btcValues).toFixed(0)
    const min = Math.min(...btcValues).toFixed(0)
    const currency = document.querySelector('#currency').value
    if(currency === "EUR"){
    document.querySelector('#max').textContent = `${max} EUR`
    document.querySelector('#min').textContent = `${min} EUR`
    } else if (currency === "USD") {
      document.querySelector('#max').textContent = `${max} USD`
      document.querySelector('#min').textContent = `${min} USD`
    }
  } catch(e){
    console.error(e)
  }
}
showChart(apiURL)

document.querySelector('.endDate').addEventListener('change', () =>{
  const dateStart = document.querySelector('.startDate').value;
  const dateEnd = document.querySelector('.endDate').value;
  const currency = document.querySelector('#currency').value

  const url = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${dateStart}&end=${dateEnd}&currency=${currency}`
  showChart(url)
})

document.querySelector('#currency').addEventListener('change', ()=>{
  const dateStart = document.querySelector('.startDate').value;
  const dateEnd = document.querySelector('.endDate').value;
  const currency = document.querySelector('#currency').value

  const url = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${dateStart}&end=${dateEnd}&currency=${currency}`
  showChart(url)
})
