const currentPrice = axios.create({
  baseURL: "https://api.coindesk.com/v1/bpi/historical"
});
const button = document.getElementById("button-sub")
button.onclick = () => {
  const date1 = document.getElementById("date1");
  const date2 = document.getElementById("date2")
  console.log(date1.value)
  const query = `/close.json?start=${date1.value}&end=${date2.value}`;
  
  bitcoinsInfo(query);
}


function bitcoinsInfo(query) {
  currentPrice.get(query)
  
  
  .then(response => {
    console.log(response)
    const keysArray = Object.keys(response.data.bpi)
    const valuesArray = Object.values(response.data.bpi)
    console.log(valuesArray)
  

    printTheChart(keysArray, valuesArray);
  })
  .catch(err => console.log("hubo un error", err))
}

function printTheChart(keyInfo, valueInfo) {
  const bitLabels = keyInfo
  const bitPrice = valueInfo
  const ctx = document.getElementById("bitcoins").getContext("2d");
  const chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: bitLabels,
      datasets: [
        {
          label: "Stock Chart",
          backgroundColor: "rgb(100, 255, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: bitPrice
        }
      ]
    }
  });
}
