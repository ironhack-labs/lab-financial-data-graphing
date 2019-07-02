
const bitcoinAPI = axios.create({
  baseURL: "https://api.coindesk.com/v1/bpi/historical/close.json"
});


const getPrices = () => {

    const dates = {
    start: document.getElementById("start").value,
    end: document.getElementById("end").value
   
  };
  const currency = document.getElementById("currency").value;

  let getValues;

  if(dates.start && dates.end && currency){
      getValues = `?start=${dates.start}&end=${dates.end}&currency=${currency}`
  } else if(currency){
      getValues = `?currency=${currency}`
  } else if(dates.start){
      getValues = `?start=${dates.start}`
  } else if(dates.end){
     getValues = `?end=${dates.end}`
  }


  bitcoinAPI
    .get(`/close.json${getValues}`)
    .then(results => {
      printTheChart(results.data.bpi);
    })
    .catch(error => console.log(error));
};


getPrices()

const printTheChart = data => {
  const labels = Object.keys(data);
  const prices = Object.values(data);

  const ctx = document.getElementById("chart").getContext("2d");

  const maxValue = document.getElementById("max")
  const minValue = document.getElementById("min")

  document.querySelector(".btn").onclick = () =>{
  maxValue.innerHTML = `${Math.max(...prices).toFixed(2)}`;
  minValue.innerHTML = `${Math.min(...prices).toFixed(2)}`;
  }

  new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Bitcoin Flux",
          backgroundColor: "orange",
          borderColor: "white",
          data: prices
        }
      ]
    }
  });
};

document.getElementById("start").onchange = () => getPrices();
document.getElementById("end").onchange = () => getPrices();
document.getElementById("currency").onchange = () => getPrices();




