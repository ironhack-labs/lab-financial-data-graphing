
// const drawCharts = (labels, values) => {
//     const ctx = document.getElementById("myChart").getContext("2d");
  
//     new Chart(ctx, {
//       type: "line",
//       data: {
//         labels: labels,
//         datasets: [
//           {
//             backgroundColor: "rgba(255, 99, 132, 0.2)",
//             label: "Bitcoin Price Index",
//             data: values
//           }
//         ]
//       }
//     });
// };
  
// const getFilteredData = (from, to) => {
//   axios
//   .get(
//       `http://api.coindesk.com/v1/bpi/historical/close.json?start=${from}&end=${to}`)
//       .then(response => {
//           const labels = Object.keys(response.data.bpi) 
//           const values = Object.values(response.data.bpi)
//           console.log(labels,values);
//           drawCharts(labels, values);
//       }).catch(err => console.log(err));
// }



// document.getElementById("start-date").onchange = () => {
//     const from = document.getElementById("start-date").value;
//     const to = document.getElementById("end-date").value;
//     getFilteredData(from,to);
    
// };

//     document.getElementById("end-date").onchange = () => {
//       const from = document.getElementById("start-date").value;
//     const to = document.getElementById("end-date").value;
//     getFilteredData(from,to);
//     };
   
  
// // getFilteredData(from,to)
      

// Get Data from coindesk
const drawCharts = (dates, values) => {
  const ctx = document.getElementById("coindesk-chart").getContext("2d");

  new Chart(ctx, {
      type: "line",
      data: {
          labels: dates,
          datasets: [{
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              label: "CoinDesk Chart",
              data: values
          }]
      }
  });
};

const startChart = () => {
  axios
  .get("http://api.coindesk.com/v1/bpi/historical/close")
  .then(response => {
      const bpi = response.data.bpi;
      // console.log(bpi);
      // console.log(typeof bpi);

      // Loop through bpi (object) and get dates (key)
      const dates = Object.keys(bpi);

      // Loop through bpi (object) and get price (values)
      const values = Object.values(bpi);

      // console.log(`DATES:`, dates);
      // console.log(`VALUES:`, values);

      drawCharts(dates, values);
  });
};

startChart();

// Filter start and end date
const filterData = (start, end) => {
  axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}`)
      .then(response => {
          const dates = Object.keys(response.data.bpi);
          const values = Object.values(response.data.bpi);

          drawCharts(dates, values);
  });
};

document.getElementById("start-date").onchange = () => {
  const start = document.getElementById("start-date").value;
  const end = document.getElementById("end-date").value;

  filterData(start, end);
};
document.getElementById("end-date").onchange = () => {
  const start = document.getElementById("start-date").value;
  const end = document.getElementById("end-date").value;

  filterData(start, end);
};