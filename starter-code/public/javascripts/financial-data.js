const getBitInfo = (dFrom, dTo) => {
  return axios
    .get(
      `http://api.coindesk.com/v1/bpi/historical/close.json?start=${dFrom}&end=${dTo}`
    )
    .then(res => {
      let dataLabels = Object.keys(res.data.bpi);
      let dataPrice = Object.values(res.data.bpi);
      return { dataLabels, dataPrice };
    });
};

const printTheChart = ({ dataLabels, dataPrice }) => {
  let ctx = document.getElementById("myChart").getContext("2d");
  let chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: dataLabels,
      datasets: [
        {
          label: "Stock Chart",
          backgroundColor: "",
          borderColor: "rgb(255, 99, 132)",
          data: dataPrice
        }
      ]
    }
  });
};

document.getElementById("bitButton").onclick = function() {
  let dFrom = document.getElementById("dateFrom").value;
  let dTo = document.getElementById("dateTo").value;
  if (dFrom == "" || dTo == "") {
    let error=document.createElement('p');
    let divError=document.getElementById("errorMessage")
    error.innerHTML="Please enter a valid date";
    divError.appendChild(error);
  } else {
    getBitInfo(dFrom, dTo).then(data => {
      printTheChart(data);
  })
}};
