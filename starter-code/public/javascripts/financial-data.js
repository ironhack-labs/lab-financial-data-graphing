const getBitInfo = (dFrom, dTo, curr) => {
  return axios
    .get(
      `http://api.coindesk.com/v1/bpi/historical/close.json?start=${dFrom}&end=${dTo}&currency=${curr}`
    )
    .then(res => {
      let dataLabels = Object.keys(res.data.bpi);
      let dataPrice = Object.values(res.data.bpi);
      return { dataLabels, dataPrice, curr };
    });
};

const printValues = ({ dataLabels, dataPrice, curr }) => {

  let min=Math.min.apply(null,dataPrice).toFixed(2);
  let max=Math.max.apply(null,dataPrice).toFixed(2);

  document.getElementById("minVal").innerHTML=`${min}`;
  document.getElementById("minCurr").innerHTML=` ${curr}`;

  document.getElementById("maxVal").innerHTML=`${max}`;
  document.getElementById("maxCurr").innerHTML=` ${curr}`;
  
};

const printTheChart = ({ dataLabels, dataPrice, curr }) => {
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
    },
    options: {
      scales: {
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: `${curr}`
            }
          }
        ],
        xAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "Dates"
            }
          }
        ]
      }
    }
  });
};

document.getElementById("bitButton").onclick = function() {
  let dFrom = document.getElementById("dateFrom").value;
  let dTo = document.getElementById("dateTo").value;
  let curr = document.getElementById("currSelec").value;
  if (dFrom == "" || dTo == "") {
    let error = document.createElement("p");
    let divError = document.getElementById("errorMessage");
    error.innerHTML = "Please enter a valid date";
    divError.appendChild(error);
  } else {
    getBitInfo(dFrom, dTo, curr).then(data => {
      printTheChart(data);
      printValues(data);
    });
  }
};
