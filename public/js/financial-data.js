// @ts-nocheck
let start = "2013-09-01"
let end = "2013-09-30"
let currency = "USD"
let apiURL = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}&currency=${currency}`

window.onload = function () {
  function printChart(bpiData) {
    const dailyData = bpiData["bpi"] // Gets the bpi data from the filtered api response data
    const bpiDates = Object.keys(dailyData) // Gets the dates from keys, returns an array of dates
    const bpiPrices = bpiDates.map((date) => dailyData[date]) // Gets the prices from the dailyData and returns an array of prices

    // filter the array to get the highest value
    let highest = Math.max(...bpiPrices)
    let lowest = Math.min(...bpiPrices)
    let currency = document.querySelector('#currency').value

    document.getElementById("max-val").innerText = `${highest} ${currency}`
    document.getElementById("min-val").innerText = `${lowest} ${currency}`

    const ctx = document.getElementById("my-chart").getContext("2d")
    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: bpiDates,
        datasets: [
          {
            label: "Stock Chart",
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgb(255, 99, 132)",
            data: bpiPrices,
          },
        ],
      },
    })
  }

  // axios.get(apiURL)
  //   .then((responseFromAPI) => {
  //     bpiData = responseFromAPI.data
  //     printChart(bpiData)
  //   })
  //   .catch((err) => console.log("Error while getting the data: ", err))

  async function printData (url) {
    try {
      const getBpiData = await axios.get(url)
      const bpiData = getBpiData.data
      printChart(bpiData)

    } catch (error) {
      console.log("Error while getting the data: ", error)
    }
  }

  printData(apiURL)

  document
    .querySelector("#get-date-to-date")
    .addEventListener("click", (event) => {
      event.preventDefault()
      start = document.getElementById('start-date').value
      end = document.getElementById('end-date').value
      const startDate = new Date(start)
      const endDate = new Date(end)

      if ((start !== '' || end !== '') && (startDate < endDate)) {
        apiURL = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}`
        printData(apiURL)
      }
    })
  
  document.querySelector('#currency').addEventListener('change', (event) => {
    const curren = document.getElementById("currency").value
    start = document.getElementById("start-date").value
    end = document.getElementById("end-date").value
    const startDate = new Date(start)
    const endDate = new Date(end)

    if ((start !== "" || end !== "") && startDate < endDate) {
      apiURL = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}&currency=${curren}`
      printData(apiURL)
    } else {
      start = "2013-09-01"
      end = "2013-09-30"
      console.log(start, end, curren)
      apiURL = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}&currency=${curren}`
      console.log(apiURL)

      printData(apiURL)
    }
  })
}