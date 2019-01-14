// 2 VERSIONS, AVEC OU SANS J QUERY.
// INTERET : NE PAS UTILISER UNE LIBRAIRIE TROP LOURDE SI CE N'EST PAS ABSOLUMENT NECESSAIRE

// GET the data and split axes : x and y
const getData = (startDate, endDate) => {
  axios
    .get("http://api.coindesk.com/v1/bpi/historical/close.json", {
      params: {
        start: startDate,
        end: endDate
      }
    })
    .then(function(response) {
      printTheChart(response.data);
    })
    .catch(function(error) {
      console.log(error);
    });
};


// RECUPERATION START DATE ET END DATE PAR DEFAUT :
const startDate = document.getElementById("startDate").value;
console.log("start : " + startDate);
const endDate = document.getElementById("endDate").value;
console.log("end : " + endDate);
// Même chose en J query :
// const startDate = $("#startDate").val();
// console.log("start : " + startDate);
// const endDate = $("#endDate").val();
// console.log("end : " + endDate);


// FONCTION UPDATE
function update() {
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;
  getData(startDate, endDate);
}
// Même chose en J query :
// function update() {
//   const startDate = $("#startDate").val();
//   const endDate = $("#endDate").val();
//   getData(startDate, endDate);
// }


// MISE A JOUR de la start date, de la end date, et de la fonction get Data :
document.getElementById("startDate").onchange = update;
document.getElementById("endDate").onchange = update;
getData(startDate, endDate);
// Même chose en J query :
//   $("#startDate").change(update);
//   $("#endDate").change(update);
//   getData(startDate, endDate);


// CONSTRUCTION DU GRAPHE
const printTheChart = stockData => {
  const bpiDates = Object.keys(stockData.bpi);
  const bpiValues = Object.values(stockData.bpi);

  const ctx = document.getElementById("myChart").getContext("2d");

  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: bpiDates,
      datasets: [
        {
          label: "Bitcoin Price Index",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: bpiValues
        }
      ]
    }
  });
};
