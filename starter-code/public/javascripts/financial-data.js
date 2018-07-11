document.getElementById("fromDate").addEventListener("input", saveDate);
document.getElementById("toDate").addEventListener("input", saveDate);
a();

let str = "";

function saveDate() {
  //console.log(fromDate.value);
  //console.log(toDate.value);

  str = `?start=${fromDate.value}&end=${toDate.value}`;
  a(str);
}

//console.log(str);

function a(str = "") {
  axios
    .get(`http://api.coindesk.com/v1/bpi/historical/close.json${str}`)
    .then(res => {
      const arrDate = Object.keys(res.data.bpi);
      const arrVal = Object.values(res.data.bpi);

      let color = [];

      for (let i = 0; i < arrVal.length; i++) {
        color.push(
          `rgb(${Math.floor(Math.random() * 254)},${Math.floor(
            Math.random() * 254
          )},${Math.floor(Math.random() * 254)})`
        );
      }

      let ctx = document.getElementById("myChart").getContext("2d");

      let myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: arrDate,
          datasets: [
            {
              label: "Bitcoin o Qué asse",
              data: arrVal,
              backgroundColor: color,
              borderColor: color,
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
    })
    .catch(err => console.log(err));
}
