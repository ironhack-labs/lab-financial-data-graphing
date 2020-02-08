const drawChart = (labels, values) => {
    const ctx = document.getElementById("myChart").getContext("2d");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [{
          backgroundColor: "rgba(255,88,132,0.2",
          label: "Bitcoin Price Index",
          data: values
        }]
      }
    })
  }
  
 
  
  
  

  const begin = (start, end) => {

    let api = 'https://api.coindesk.com/v1/bpi/historical/close.json'
    if (start && end) {
        api = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}`
    }

    return axios
      .get(api)
      .then(response => {
        
        const keys = Object.keys(response.data.bpi);
        const values = Object.values(response.data.bpi);

  
        drawChart(keys, values);

      });
  };

  
  
  let start = document.querySelector('#start')
  let end = document.querySelector('#end')
   


  window.onload= () => {
      begin()
      start.addEventListener("change", () => begin(start.value, end.value))
      end.addEventListener("change", () => begin(start.value, end.value))
  }

  
  
