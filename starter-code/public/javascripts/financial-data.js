let update = ()=>{
  let start = $('#start').val();
  let end = $('#end').val();
  let value = $('#value').val();
  const api_url = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}&currency=${value}`;
  
  axios
    .get(api_url)
    .then(res => {
      return res.data
    })
    .then(data => {
      const date = Object.keys(data.bpi);
      const val = Object.values(data.bpi);
      let measures = {
        values : val,
        dates : date
      }
      return measures
    })
    .then( (measures) => { 
       drawChart(measures);
    })    

    const drawChart = (measures) => {
      let BitcoinsVals = measures.values;
      let Dates = measures.dates;    

    let ctx = document.getElementById("myChart").getContext("2d");
    let chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: Dates,
        datasets: [
          {
            label: "Fechas",
            data: BitcoinsVals,
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgb(255, 99, 132)",
            
          }
        ]
      }
      
    });
  }
}

$(document).ready(update);
$('#start').change(update);
$('#end').change(update);
$('#value').change(update);
