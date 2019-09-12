const drawCharts = (labels, values) => {

  const ctx = document.getElementById('myChart').getContext('2d');

  new Chart(ctx, {
      type: "line",
      data: {
          labels: labels,
          datasets: [{
              backgroundColor: "rgba(233,233,233, 0.8)",
              label: "Bitcoin Price Index",
              data: values
          }]
      }
  })
}




// 2
axios.get("http://api.coindesk.com/v1/bpi/historical/close.json")
    .then(response => {
        console.log(response.data);
        const labels = Object.keys(response.data.bpi);
        const values = Object.values(response.data.bpi);

        drawCharts(labels, values);
    });


// //3
// const getDataForDate = (start, end) => {
//   axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}`).then(response => {

//       const labels = Object.keys(response.data.bpi);
//       const values = Object.values(response.data.bpi);
//       drawCharts(labels, values);
//   });
// };


// document.getElementById("from-date").onchange = () => {
//   const start = document.getElementById("from-date").value;
//   const end = document.getElementById("to-date").value;
//   if (end === "") return;
//   getDataForDate(start, end);
// };

// document.getElementById("to-date").onchange = () => {
//   const start = document.getElementById("from-date").value;
//   const end = document.getElementById("to-date").value;
//   getDataForDate(start, end);
// }; 
