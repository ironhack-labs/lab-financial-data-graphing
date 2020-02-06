const newDate = () => {
  const dateFrom = document.getElementById("date-from");
  const dateTo = document.getElementById("date-to");

  let defaultDate = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${dateFrom.value}&end=${dateTo.value}`;

  console.log("sup", dateFrom);
  if (!dateFrom.value && !dateTo.value) {
    defaultDate = "http://api.coindesk.com/v1/bpi/historical/close.json";
  }

  console.log("deafult date", defaultDate);

  //https://api.coindesk.com/v1/bpi/historical/close.json?start=${dateFrom.value}&end=${dateTo.value}
  axios.get(`${defaultDate}`).then(response => {
    const priceData = response.data.bpi;
    //console.log(response.data.bpi);
    const dateArray = [];
    const priceArray = [];
    for (let key in response.data.bpi) {
      console.log("KEEEEY", key);
      console.log("price: ", response.data.bpi[key]);
      dateArray.push(key);
      priceArray.push(response.data.bpi[key]);
    }

    var ctx = document.getElementById("myChart").getContext("2d");
    var myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: dateArray,
        datasets: [
          {
            label: "Bitcoin Price Index",
            data: priceArray,
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: false
              }
            }
          ]
        }
      }
    });
  });
};

newDate();

// axios

//   .get("http://api.coindesk.com/v1/bpi/historical/close.json")
//   .then(response => {
//     const priceData = response.data.bpi;
//     //console.log(response.data.bpi);
//     const dateArray = [];
//     const priceArray = [];
//     for (let key in response.data.bpi) {
//       console.log("KEEEEY", key);
//       console.log("price: ", response.data.bpi[key]);
//       dateArray.push(key);
//       priceArray.push(response.data.bpi[key]);
//     }

//     var ctx = document.getElementById("myChart").getContext("2d");
//     var myChart = new Chart(ctx, {
//       type: "line",
//       data: {
//         labels: dateArray,
//         datasets: [
//           {
//             label: "Bitcoin Price Index",
//             data: priceArray,
//             borderWidth: 1
//           }
//         ]
//       },
//       options: {
//         scales: {
//           yAxes: [
//             {
//               ticks: {
//                 beginAtZero: false
//               }
//             }
//           ]
//         }
//       }
//     });
//   });
