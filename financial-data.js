//const currency = "currentprice"
const currencyApi = axios({
    method:"GET",
    baseURL: `https://api.coindesk.com/v1/bpi/currentprice/EUR.json`,
  }).then(res =>{
    console.log(res.data)
    printTheChart(res.data)
  })

  function printTheChart(currencyValue) {
    const currency = currencyValue['bpi'] ;
    const currencyVal = Object.keys(currency);
   
    const newData = currencyVal.map(dollar => currency[dollar]['rate']);
    console.log(newData)
    
  
    const ctx = document.getElementById('my-chart').getContext('2d');
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: currencyVal,
        datasets: [
          {
            label: 'numbers',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: newData
          }
        ]
      }
    }); // closes chart = new Chart()
  } // closes printTheChart()
  

   
  /*
  async function getCurrency() {
    try {
      const { time: currency } = await currencyApi.get("/currentprice.json");
      console.log("currency", currency);
    } catch (err) {
      console.log(err);
    }
  }
  
  getCurrency()
  */