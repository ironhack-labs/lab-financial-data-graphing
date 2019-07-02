let ctx = document.getElementById("myChart").getContext("2d");


// Inicio
axios
    .get(
      `https://api.coindesk.com/v1/bpi/historical/close.json`
    )
    .then(JSONPayload => {
      let originDatos = JSONPayload.data.bpi;

      let datosX = Object.keys(originDatos);

      let datosY = Object.values(originDatos);

      // console.log(Object.keys(originDatos))
      // console.log(Object.values(originDatos))

      const graph = new Chart(ctx, {
        type: "line",
        data: {
          labels: datosX, //X
          datasets: [
            {
              label: "Price of Bitcoin",
              data: datosY, //Y
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)"
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
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
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          }
        }
      });
    });














// Actualizar por fecha

document.getElementById("update").onclick = () => {
    
  endDate = document.getElementById("endDate").value;
  originDate = document.getElementById("originDate").value;

  axios
    .get(
      `https://api.coindesk.com/v1/bpi/historical/close.json?start=${originDate}&end=${endDate}`
    )
    .then(JSONPayload => {
      let originDatos = JSONPayload.data.bpi;

      let datosX = Object.keys(originDatos);

      let datosY = Object.values(originDatos);

      // console.log(Object.keys(originDatos))
      // console.log(Object.values(originDatos))

      const graph = new Chart(ctx, {
        type: "line",
        data: {
          labels: datosX, //X
          datasets: [
            {
              label: "Price of Bitcoin",
              data: datosY, //Y
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)"
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
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
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          }
        }
      });
    });
};
