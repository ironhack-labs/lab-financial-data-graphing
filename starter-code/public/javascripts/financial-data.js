let chart;
let label;
let values;

axios
  .get("http://api.coindesk.com/v1/bpi/historical/close.json")
  .then(response => {
    console.log(response);
    const result = response.data.bpi;
    label = Object.keys(result);
    values = Object.values(result);

    let ctx = document.getElementById("myChart").getContext("2d");
    chart = new Chart(ctx, {
      // The type of chart we want to create
      type: "line",

      // The data for our dataset
      data: {
        labels: label,
        datasets: [
          {
            label: "My First dataset",
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgb(255, 99, 132)",
            data: values
          }
        ]
      },

      // Configuration options go here
      options: {}
    });
    const financialList = response.data.results;
  });

function getEndObject(object) {
  let startDate = document.getElementById("start-date");
  let endDate = document.getElementById("end-date");
  console.log(startDate, endDate);
  console.log(startDate.value);

  axios
    .get(
      `https://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate.value}&end=${endDate.value}`
    )
    .then(response => {
      console.log(response);
      const result = response.data.bpi;
      label = Object.keys(result);
      values = Object.values(result);

      let ctx = document.getElementById("myChart").getContext("2d");
      chart = new Chart(ctx, {
        // The type of chart we want to create
        type: "line",

        // The data for our dataset
        data: {
          labels: label,
          datasets: [
            {
              label: "My First dataset",
              backgroundColor: "rgb(255, 99, 132)",
              borderColor: "rgb(255, 99, 132)",
              data: values
            }
          ]
        },

        // Configuration options go here
        options: {}
      });
    });
}
