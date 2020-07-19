window.onload = () => {
  const today = Date.now("YYYY-MM-DD")
  console.log(today)
  // $('#end').attr('value', today)
  $("#start").datepicker({
    format: 'yyyy-mm-dd',
    uiLibrary: "bootstrap4",
  })

  $("#end").datepicker({
    format: 'yyyy-mm-dd',
    uiLibrary: "bootstrap4",
  })
  const startV = $("#start").val("2013-09-01").toString()
  const endV = $("#end").val("2013-09-05").toString()
  refreshChart("2013-09-01", "2013-09-05")
}

$("#start").change(function () {
  console.log($("#start").val())
  const startV = $("#start").val().toString()
  const endV = $("#end").val().toString()
  refreshChart(startV, endV)
})

$("#end").change(function () {
  console.log($("#end").val())
  const startV = $("#start").val().toString()
  const endV = $("#end").val().toString()
  refreshChart(startV, endV)
})

const renderChart = (data) => {
  const dataStock = data.bpi
  const dataLabels = Object.keys(dataStock)
  const dataSets = Object.values(dataStock)

  const ctx = document.getElementById("myChart").getContext("2d")
  const myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: dataLabels,
      datasets: [
        {
          label: "BPI",
          data: dataSets,
          backgrounådColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    },
  })
}

// Get only necesary data
axios.interceptors.response.use((config) => {
  return config.data
})

const refreshChart = (start, end) => {
  // Get data from api
  const url = "http://api.coindesk.com/v1/bpi/historical/close.json"

  axios
    .get(`${url}?start=${start}&end=${end}`)
    .then((data) => renderChart(data))
    .catch((error) => console.error(error))
}
