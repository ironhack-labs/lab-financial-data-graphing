// let url = "http://api.coindesk.com/v1/bpi/historical/close.json";
    let date = new Date;
   let today = date.toISOString().slice(0, 10);
   let value = [];
   
refreshData("2022-01-01",today, "USD");

function refreshData(start, end, currency) {
    url = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}&currency=${currency}`;
    axios.get(url)
    .then((data)=>{
    let bpi = data.data.bpi;
    printChart(bpi);
    document.getElementById("min").innerHTML = `Min value: ${info(value)[0]} ${currency}`;
document.getElementById("max").innerHTML = `Max value: ${info(value)[1]} ${currency}`;
    })
    .catch((err)=>{
        console.log(err);
    })
}



function printChart(data){
    const time = Object.keys(data);
   
    for (let key in data ){
        value.push(data[key]);
    }
   const ctx = document.getElementById('chart').getContext('2d');
   const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels:time,
        datasets: [{
            label: "bitcoin value",
            data: value,
            fill:false,
            borderColor: 'rgb(75, 192, 192)',
        }]
      }
   } )  
}

let info = (array) => {
    let minMax = []
     minMax.push(Math.min(...array));
     minMax.push(Math.max(...array));
     return minMax;
}