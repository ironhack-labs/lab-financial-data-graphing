const twoDigits = value => { return value > 9 ? value : `0${value}`}
const today = new Date().toISOString().slice(0,10);
const monthAgo = new Date().getUTCFullYear() + '-' + twoDigits(new Date().getUTCMonth()) + '-' + twoDigits(new Date().getUTCDate())

let currency = 'USD'

window.onload = () => {
  $("#start").datepicker({
    format: 'yyyy-mm-dd',
    uiLibrary: "bootstrap4",
  })
  $("#end").datepicker({
    format: 'yyyy-mm-dd',
    uiLibrary: "bootstrap4",
  })

  $("#start").val(monthAgo)
  $("#end").val(today)

  refreshChart(monthAgo, today, currency)
}

const errorDates = () => {
  $("#error").removeClass('d-none')
  $("#start").addClass('is-invalid')
  $("#error").html('Start date cannot be greater than or equal to end date') 
  setTimeout(() => {
    $("#error").addClass('d-none')
    $("#start").removeClass('is-invalid')
  }, 5000);
}

$("#start").change(function () {
  const startV = $("#start").val()
  const endV = $("#end").val()
  if (startV > endV) {
    return errorDates()
  }
  refreshChart(startV, endV, currency)
})
$("#end").change(function () {
  const startV = $("#start").val()
  const endV = $("#end").val()
  if (startV > endV) {
    return errorDates()
  }
  refreshChart(startV, endV, currency)
})
$("#currency").change(function () {
  const startV = $("#start").val()
  const endV = $("#end").val()
  currency = $("#currency").val()
  if (startV > endV) {
    return errorDates()
  }
  refreshChart(startV, endV, currency)
})

$("#start, #end").change(function () {
  const startV = $("#start").val()
  const endV = $("#end").val()
  if (startV > endV) {
    return errorDates()
  }
  refreshChart(startV, endV, currency)
})

const updateValuesMaxMin = (maxVal, minVal) => {
  $("#maxV").html(`Max: ${maxVal} ${currency}`)
  $("#minV").html(`Min: ${minVal} ${currency}`)
}

const renderChart = (data) => {
  const dataStock = data.bpi
  const dataLabels = Object.keys(dataStock)
  const dataSets = Object.values(dataStock)
  const maxVal = dataSets.reduce((a, b) => {
      return a > b ? a : b 
  })
  const minVal = dataSets.reduce((a, b) => {
      return a < b ? a : b 
  })
  updateValuesMaxMin(maxVal, minVal)  
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

const refreshChart = (start, end, currency) => {
  // Get data from api
  const url = "http://api.coindesk.com/v1/bpi/historical/close.json"

  axios
    .get(`${url}?start=${start}&end=${end}&currency=${currency}`)
    .then((data) => renderChart(data))
    .catch((error) => console.error(error))
}