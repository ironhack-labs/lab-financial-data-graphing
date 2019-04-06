const baseUrl = "https://api.coindesk.com/v1/bpi";
const ctx = document.getElementById("chart").getContext("2d");
const redCol = randomNum();
const greenCol = randomNum();
const blueCol = randomNum();

function randomNum(maxNum = 256) {
  return Math.floor(Math.random() * maxNum);
}

axios
  .get(`${baseUrl}/historical/close.json`)
  .then(res => {
    let bpi = res.data.bpi;
    let bpiDates = [];
    let bpiValues = [];
    // loop through the properties in the object
    for (let date in bpi) {
      bpiDates.push(date);
      bpiValues.push(bpi[date]);
    }
    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: bpiDates,
        datasets: [
          {
            label: "Bitcoin Price Index",
            backgroundColor: `rgb(${redCol}, ${greenCol}, ${blueCol})`,
            borderColor: `rgb(${redCol}, ${greenCol}, ${blueCol})`,
            data: bpiValues
          }
        ]
      }
    });
  })
  .catch(err => {
    console.log("Error al recuperar datos de API de coindesk");
  });
