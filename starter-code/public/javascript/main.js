console.log("Welcome to main js");
var ctx = document.getElementById("myChart").getContext("2d");

function displayChart(start, end) {
  axios
    .get(
      "http://api.coindesk.com/v1/bpi/historical/close.json?start=" +
        start +
        "&end=" +
        end
    )
    .then(function(response) {
      var bpi = response.data.bpi;
      var labels = Object.keys(bpi);
      var dataValues = Object.values(bpi);

      new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              data: dataValues,
              label: "Bitcoin Price Index",
              borderColor: "#3e95cd",
              fill: false
            }
          ]
        }
      });
      console.log(response.data.bpi);
    })
    .catch(function(error) {
      console.log(error);
    });
}

displayChart("2017-06-01", "2017-10-03");

// var bpi = {
//   "2017-09-02": 4643.975,
//   "2017-09-03": 4631.695,
//   "2017-09-04": 4319.7213,
//   "2017-09-05": 4422.1213,
//   "2017-09-06": 4626.72,
//   "2017-09-07": 4638.0975,
//   "2017-09-08": 4317.5375,
//   "2017-09-09": 4291.88,
//   "2017-09-10": 4191.175,
//   "2017-09-11": 4188.845,
//   "2017-09-12": 4148.2675,
//   "2017-09-13": 3874.2588,
//   "2017-09-14": 3226.4125,
//   "2017-09-15": 3686.9,
//   "2017-09-16": 3678.7375,
//   "2017-09-17": 3672.5663,
//   "2017-09-18": 4067.0775,
//   "2017-09-19": 3896.9988,
//   "2017-09-20": 3858.0888,
//   "2017-09-21": 3612.6813,
//   "2017-09-22": 3603.3088,
//   "2017-09-23": 3777.2938,
//   "2017-09-24": 3662.12,
//   "2017-09-25": 3927.4988,
//   "2017-09-26": 3895.5125,
//   "2017-09-27": 4208.5613,
//   "2017-09-28": 4185.2925,
//   "2017-09-29": 4164.1038,
//   "2017-09-30": 1353.0475,
//   "2017-10-01": 4394.6388,
//   "2017-10-02": 4404.0975
// };
//
