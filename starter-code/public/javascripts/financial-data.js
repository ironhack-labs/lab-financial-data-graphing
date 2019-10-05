const ctx = document.getElementById("myChart").getContext("2d");
const startDate = document.getElementById("startDate");
const finishDate = document.getElementById("finishDate");
let startValue = "";
let finishValue = "";

function getBitcoinValuesInMonth(
  url = "https://api.coindesk.com/v1/bpi/historical/close.json"
) {
  axios
    .get(url)
    .then(res => {
      let { bpi: information } = res.data;
      dates = Object.keys(information);
      values = Object.values(information);

      console.log(dates);
      console.log(values);

      let data = {
        labels: dates,
        datasets: [
          {
            label: "Bitcoin Values",
            data: values,
            backgroundColor: "blue",
            borderColor: "lightblue",
            fill: false,
            lineTension: 0,
            radius: 5
          }
        ]
      };

      //options
      let options = {
        responsive: true,
        title: {
          display: true,
          position: "top",
          text: "Line Graph",
          fontSize: 18,
          fontColor: "#111"
        },
        legend: {
          display: true,
          position: "bottom",
          labels: {
            fontColor: "#333",
            fontSize: 16
          }
        }
      };

      //create Chart class object
      var chart = new Chart(ctx, {
        type: "line",
        data: data,
        options: options
      });
    })
    .catch(err => {
      console.log(err);
    });
}

function getBitcoinValuesInPeriod(
  url = "https://api.coindesk.com/v1/bpi/historical/close.json"
) {
  axios
    .get(url)
    .then(res => {
      let { bpi: information } = res.data;
      dates = Object.keys(information);
      values = Object.values(information);

      console.log(dates);
      console.log(values);

      let data = {
        labels: dates,
        datasets: [
          {
            label: "Bitcoin Values",
            data: values,
            backgroundColor: "blue",
            borderColor: "lightblue",
            fill: false,
            lineTension: 0,
            radius: 5
          }
        ]
      };

      //options
      let options = {
        responsive: true,
        title: {
          display: true,
          position: "top",
          text: "Line Graph",
          fontSize: 18,
          fontColor: "#111"
        },
        legend: {
          display: true,
          position: "bottom",
          labels: {
            fontColor: "#333",
            fontSize: 16
          }
        }
      };

      //create Chart class object
      var chart = new Chart(ctx, {
        type: "line",
        data: data,
        options: options
      });
    })
    .catch(err => {
      console.log(err);
    });
}

if (startDate.value === "" || finishDate.value === "") {
  getBitcoinValuesInMonth();
}

// if (startDate.value && finishDate.value) {
//   console.log("HereIAM");
//   getBitcoinValuesInPeriod(
//     `https://api.coindesk.com/v1/bpi/historical/close.json/?start=${startvalue}&end=${finishValue}`
//   );
// }

startDate.addEventListener("input", event => {
  console.log(startDate.value);
  startValue = startDate.value;
  if (startDate.value && finishDate.value) {
    console.log("HereIAM");
    getBitcoinValuesInPeriod(
      `https://api.coindesk.com/v1/bpi/historical/close.json?start=${startValue}&end=${finishValue}`
    );
  }
});

finishDate.addEventListener("input", event => {
  console.log(finishDate.value);
  finishValue = finishDate.value;
  console.log(typeof finishValue);
  if (startDate.value && finishDate.value) {
    console.log("HereIAM");
    getBitcoinValuesInPeriod(
      `https://api.coindesk.com/v1/bpi/historical/close.json?start=${startValue}&end=${finishValue}`
    );
  }
});
