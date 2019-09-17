const getData = currentPrice => {
  axios.get("http://api.coindesk.com/v1/bpi/historical/close.json")
      .then(response => {
          // console.log(response);
      })
      .catch(err => {
          console.log(err);
      })
};

getData();

const drawChart = (labels, values) => {
  const ctx = document.getElementById("myChart").getContext("2d");

  new Chart(ctx, {
      type: "line",
      data: {
          labels: labels,
          datasets: [
              {
                  backgroundColor: "rgba(61, 166, 162, 0.2)",
                  label: "Bitcoin Price Index",
                  data: values
              }
          ]
      }
  });
};

function updateChart(start, end, currency) {
  axios
      .get(
          `http://api.coindesk.com/v1/bpi/historical/close?start=${start}&end=${end}&currency=${currency}`
      )
      .then(response => {

          const labels = Object.keys(response.data.bpi);

          const values = Object.values(response.data.bpi);

          drawChart(labels, values);
      });
}

document.querySelector("button").onclick = () => {
  const start = document.getElementById("date-from").value;
  const end = document.getElementById("date-to").value;
  const currency = document.getElementById("currency").value;
  
  updateChart(start, end, currency);
};


// document.querySelector("#currency").onchange = () =>{
//   const currency = document.getElementById("currency").value;
  
  
// }
