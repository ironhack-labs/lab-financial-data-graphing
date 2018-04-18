window.onload = () => {
function draw(){

  let dateInit = document.getElementById('init').value;
  let dateFinal = document.getElementById('final').value;
  
  
  let dateInitF = (i) => {i = this.value};
  let dateFinalF = (f) => {f = this.value};
  
  convertDate = (dateString) => {
    let p = dateString.split("-")
    if (p[0].split("").length === 4) {
      return [p[0],p[1],p[2] ].join("-")
    } else {
      return [p[2],p[1],p[0] ].join("-")
    }
    }
     
  dateInit = convertDate(dateInit);
  dateFinal = convertDate(dateFinal);
    
  const api_url = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${dateInit}&end=${dateFinal}`;
  
  let keys = (x) => Object.keys(x);
  let values = (x) => Object.values(x);
  

  
    axios
    .get(api_url)
    .then(closes => drawChart(closes));
  
  const drawChart = datos => {
    
    let stockLabels = keys(datos.data.bpi).map(e => e);
    let stockPrice = values(datos.data.bpi).map(e => e);
  
    let ctx = document.getElementById("myChart").getContext("2d");
    let chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: stockLabels,
        datasets: [
          {
            label: "Stock Chart",
            borderColor: "purple",
            data: stockPrice
          }
        ]
      }
    });
  };
  
  }
  
  document.getElementById('init').addEventListener("change", draw());
  document.getElementById('final').addEventListener("change", draw());

}

