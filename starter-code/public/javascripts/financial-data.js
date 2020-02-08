const ctx = document.getElementById('myChart').getContext('2d');
const apiURL = 'http://api.coindesk.com/v1/bpi/historical/close.json'

const maxValueP = document.getElementById('maxValue')
const minValueP = document.getElementById('minValue')

const firstDate = document.getElementById("fromDate")
const secondDate = document.getElementById("toDate")
const currency = document.getElementById('currency')

const firstCharge = async() => {
    const requestAPI = await axios.get(apiURL)
    const data = requestAPI.data.bpi
    const maxValue = Math.max.apply(null,Object.values(data)).toFixed(2)
    const minValue = Math.min.apply(null,Object.values(data)).toFixed(2)
    maxValueP.innerText = `${maxValue} ${currency.value}`
    minValueP.innerText = `${minValue} ${currency.value}`
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
  if (firstDate.value !== undefined && secondDate.value !== undefined) {
    const requestAPI = await axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${firstDate.value}&end=${secondDate.value}&currency=${currency.value}`)
    const data = requestAPI.data.bpi
    const maxValue = Math.max.apply(null,Object.values(data)).toFixed(2)
    const minValue = Math.min.apply(null,Object.values(data)).toFixed(2)
    maxValueP.innerText = `${maxValue} ${currency.value}`
    minValueP.innerText = `${minValue} ${currency.value}`
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


