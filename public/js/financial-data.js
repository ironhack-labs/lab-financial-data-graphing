const URL = "http://api.coindesk.com/v1/bpi/historical/close.json";

axios.get(URL)
.then((data)=>{
let bpi = data.data.bpi;
console.log(typeof bpi)
printChart(bpi);
})
.catch((err)=>{
    console.log(err);
})

function printChart(data){
    const time = Object.keys(data);
    let value = []
    for (let key in data ){
        value.push(data[key]);
    }
   console.log(time);
   console.log(value);
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