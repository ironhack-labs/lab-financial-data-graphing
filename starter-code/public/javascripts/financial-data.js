let start;
let end;
let currency;

$(".getDates").on("change",(e)=>{
  e.preventDefault();
  start=$("#from").val()
  end=$("#to").val()

  getData(start,end,currency).then(res=>printTheChart(res));
  getData(start,end,currency).then(res=>minAndMax(res));


})

$("#currency").on("change",(e)=>{
  e.preventDefault();
  currency=$("#currency").val();
  getData(start,end,currency).then(res=>printTheChart(res))
  getData(start,end,currency).then(res=>minAndMax(res));;
})
  
const getData=(start,end,currency="EUR")=>{
  let url;
  if(start && end){
    url=`http://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}&currency=${currency}`
  }
  else{
    url=`http://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}`
  }
    return axios.get(url)
    .then(res=> {
      return{
        bpi:res.data.bpi,
      }
    }).catch(e=>console.log(e))
}

getData(start,end,currency).then(res=>printTheChart(res));
getData(start,end,currency).then(res=>minAndMax(res));


 const printTheChart = ((res) => {
   let x = Object.keys(res.bpi);
   let y = Object.values(res.bpi);
   let ctx = document.getElementById('myChart').getContext('2d');
   let myChart = new Chart(ctx, {
    type: 'line',
     data: {
       labels: x,
       datasets: [{
         label: "Stock Chart",
         backgroundColor: 'rgb(255, 99, 132)',
         borderColor: 'rgb(255, 99, 132)',
         data: y,
       }]
    }
  });
});

const minAndMax = (res) =>{
  let max=Math.max.apply(0,Object.values(res.bpi))
  let min=Math.min.apply(0,Object.values(res.bpi))
  $("#max").text(max);
  $("#min").text(min);
}












  













// var ctx = document.getElementById("myChart").getContext('2d');
// var myChart = new Chart(ctx, {
//     type: 'bar',
//     data: {
//         labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
//         datasets: [{
//             label: '# of Votes',
//             data: [12, 19, 3, 5, 2, 3],
//             backgroundColor: [
//                 'rgba(255, 99, 132, 0.2)',
//                 'rgba(54, 162, 235, 0.2)',
//                 'rgba(255, 206, 86, 0.2)',
//                 'rgba(75, 192, 192, 0.2)',
//                 'rgba(153, 102, 255, 0.2)',
//                 'rgba(255, 159, 64, 0.2)'
//             ],
//             borderColor: [
//                 'rgba(255,99,132,1)',
//                 'rgba(54, 162, 235, 1)',
//                 'rgba(255, 206, 86, 1)',
//                 'rgba(75, 192, 192, 1)',
//                 'rgba(153, 102, 255, 1)',
//                 'rgba(255, 159, 64, 1)'
//             ],
//             borderWidth: 1
//         }]
//     },
//     options: {
//         scales: {
//             yAxes: [{
//                 ticks: {
//                     beginAtZero:true
//                 }
//             }]
//         }
//     }
// });