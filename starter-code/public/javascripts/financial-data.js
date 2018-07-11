document.getElementById("form").onsubmit = ()=>{

    event.preventDefault();
    const info = axios.create({
        baseURL: 'http://api.coindesk.com/v1/'
    })
    const max = document.getElementById("max")
    const min = document.getElementById("min")

    const canvas = document.getElementById("char")
    const from = document.getElementById("from").value
    const to = document.getElementById("to").value
    const currency = document.getElementById("currency").value
    const axiosTicket = `bpi/historical/close.json?start=${from}&end=${to}&currency=${currency}`;
    
    info.get(`${axiosTicket}`)
    .then(res=>{
        console.log(res.data.bpi)
        printTheChart(res.data.bpi)
    })
    
    let printTheChart = ((stockData) => {
        let keys = Object.keys(stockData)
        let values = Object.values(stockData)
        let maxValue = Math.max.apply(null,values)
        let minValue = Math.min.apply(null,values)
        max.innerText = `Max: ${maxValue}`
        min.innerText = `Min: ${minValue}`
        let ctx = canvas.getContext('2d');
        let chart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: keys,
            datasets: [{
              label: "Bitcoin price index",
              backgroundColor: 'rgb(255, 99, 132)',
              borderColor: 'rgb(255, 99, 132)',
              data: values,
            }]
          }
        });
    
      
    })
      
      
      
}