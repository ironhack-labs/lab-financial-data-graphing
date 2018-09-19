let data = [];
let dates = [];
let url = "https://api.coindesk.com/v1/bpi/historical/close.json";
let bounds = "";
let dateF;
let dateT;

const drawChart = () => {
  axios
    .get(url + bounds)
    .then(res => {
      data = Object.values(res.data.bpi);
      dates = Object.keys(res.data.bpi);
    })
    .then(() => {
      const ctx = document.getElementById("myChart").getContext("2d");
      const myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: dates,
          datasets: [
            {
              label: "BPI",
              data: data
            }
          ]
        },
        options: {}
      });
    });
};

$("#dateF").change(() => {
  dateF = $("#dateF").val();
  bounds = `?start=${dateF}&end=${dateT}`;
  drawChart();
});
$("#dateT").change(() => {
  dateT = $("#dateT").val();
  bounds = `?start=${dateF}&end=${dateT}`;
  drawChart();
});


$(document).ready(()=>{
    drawChart();
});
