document.addEventListener('DOMContentLoaded', () => {

const coinInfo  = axios.create({
     baseURL: 'http://api.coindesk.com/v1/bpi/historical/close.json',
   });


   let from //=document.getElementById("from").values;
   let to//= document.getElementById("to").values;
   let currency=document.getElementById("currency").value;
   
   const urlAPI =(()=>{  
        if(from!=undefined & to!=undefined & currency!='USD') {
          return  `http://api.coindesk.com/v1/bpi/historical/close.json?start=${from}&end=${to}?currency=${currency}`
             }else if ( from!=undefined & to!=undefined ) {
               return  `http://api.coindesk.com/v1/bpi/historical/close.json?start=${from}&end=${to}`

             }else if (currency!='USD')
             return  `http://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}`
             

        else {
             return 'http://api.coindesk.com/v1/bpi/historical/close.json'}
        });

   //console.log(coinInfo);
   coinInfo.get(urlAPI()). then (data => {
        let bpi=data.data.bpi;
        let coinLabels = Object.keys( bpi);
        let coinPrice = Object.values( bpi);
     printTheChart(coinLabels,coinPrice)
     })

//   let coinTicket = "bpi";
   
//    coinInfo.get(`${coinTicket}/chart`)
//      .then(function (response) {
//        console.log(response);
//        printTheChart(response);
//      })
//      .catch(function (error) {
//        console.log(error);
//    });

let printTheChart = ((coinLabels,coinPrice) => {
 
  let ctx = document.getElementById('myChart').getContext('2d');
  let chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: coinLabels,
      datasets: [{
        label: "coin Chart",
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: coinPrice,
      }]
    }
  });
});


document.getElementById("btn").onclick= ()=>{
     console.log(urlAPI())
      from= document.getElementById("from").value;
      to= document.getElementById("to").value;
      currency=document.getElementById("currency").value;
     console.log(to)
     console.log(from)
     coinInfo.get(urlAPI()). then (data => {
          let bpi=data.data.bpi;
          let coinLabels = Object.keys( bpi);
          let coinPrice = Object.values( bpi);
       printTheChart(coinLabels,coinPrice)
       })
}

} ,false);
