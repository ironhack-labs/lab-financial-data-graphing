const ctx = document.getElementById('myChart').getContext('2d');
const apiURL = 'http://api.coindesk.com/v1/bpi/historical/close.json'

const firstCharge = async() => {
    const requestAPI = await axios.get(apiURL)
    const data = requestAPI.data.bpi
    new Chart(ctx, {
        type: "line",
        data: {
          labels: Object.keys(data),
          datasets: [
            {
              label: "Bitcoin Price Index",
              data: Object.values(data)
            }
          ]
        }
      })
}

firstCharge()

const selectDate = async () => {
  const firstDate = document.getElementById("fromDate")
  const secondDate = document.getElementById("toDate")
  if (firstDate.value !== undefined && secondDate.value !== undefined) {
    const requestAPI = await axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${firstDate.value}&end=${secondDate.value}`)
    const data = requestAPI.data.bpi
    new Chart(ctx, {
        type: "line",
        data: {
          labels: Object.keys(data),
          datasets: [
            {
              label: "Bitcoin Price Index",
              data: Object.values(data)
            }
          ]
        }
      })
};
}


