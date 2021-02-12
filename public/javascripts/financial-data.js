const apiUrl = "http://api.coindesk.com/v1/bpi/historical/close.json"
let myChart;



// get

axios.get(apiUrl)
    .then((response) => {
        const {
            data
        } = response
        const xAxis = Object.keys(data.bpi)
        const yAxis = Object.values(data.bpi);
        paintChart(xAxis, yAxis)
        console.log(yAxis)
    })
    .catch((e) => console.log("Error geting data", e))


const paintChart = (xAxis, yAxis) => {
    const ctx = document.getElementById("my-chart").getContext("2d");
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: xAxis,
            datasets: [{
                data: yAxis,
                label: "BTC",
                borderColor: "blue",
                backgroundColor: "transparent"

            }]
        }
    })
}



const query = () => {
    const from = document.getElementById("dateFrom").value
    const to = document.getElementById("dateTo").value;
    const queryUrl = `${apiUrl}?start=${from}&end=${to}`;
   
    myChart.data.labels = [];
    myChart.data.datasets = [];
   

   //get
    axios.get(queryUrl)
       .then((response) =>{
           const { data } = response;
           const xAxis = Object.keys(data.bpi);
           const yAxis = Object.values(data.bpi);
           updateData(myChart, xAxis, yAxis);
           
       }) 

    

}

const button = document.getElementById("home-button").addEventListener("click", query)


const updateData = (chart, label, yAxis) => {
  chart.data.labels = label;
  chart.data.datasets = [
    {
      label: "BTC",
      borderColor: "blue",
      backgroundColor: "transparent",
      data: yAxis,
    },
  ];

  chart.update();
};