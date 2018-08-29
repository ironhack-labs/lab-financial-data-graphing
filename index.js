let inputFrom;
let inputTo;

$("#from-btn").click(() => {
    inputFrom = $("#from").val();
    inputTo = $("#to").val();

    axios
    .get("http://api.coindesk.com/v1/bpi/historical/close.json")
    .then(result => {
      const keys = Object.keys(result.data.bpi);
        console.log(result.data)
        console.log(result.data.bpi)

        let newKeys = keys.slice(keys.indexOf(inputFrom), keys.indexOf(inputTo))
      
      const values = newKeys.map(x => {
        return result.data.bpi[x];
      });

      var ctx = document.getElementById("myChart").getContext("2d");
      var myChart = new Chart(ctx, {
                type: "line",
        data: {
          labels: newKeys,
          datasets: [
            {
              label: "# of Votes",
              data: values,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)"
              ],
              borderColor: [
                "rgba(255,99,132,1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)"
              ],
              borderWidth: 1
            }
          ]
        },
        options: {}
      });
    });
})