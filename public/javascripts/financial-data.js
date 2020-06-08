const $btn = document.querySelector("#submitBtn");

$btn.addEventListener("click", ()=>{
  const index = "[USD/BPI]";
  const $currency = document.querySelector("#currency");
  const $startDate = document.querySelector("#startDate");
  const $endDate = document.querySelector("#endDate");
  
  const apiUrl = `http://api.coindesk.com/v1/bpi/historical/close.json?index=${index}currency=${$currency.value}&start=${$startDate.value}&end=${$endDate.value}`;
  axios
  .get(apiUrl)
  .then(response => {
    console.log("The response from API: ", response);
    printTheChart(response.data.bpi);
  })
  .catch(err => {
    console.log("Error while getting the data: ", err);
  });

})
    




function printTheChart(data){
    
      const date = Object.keys(data);
      const price = Object.values(data);
      const ctx = document.getElementById('myChart').getContext('2d');
      const myChart = new Chart(ctx, {
          type: 'line',
          data: {
              labels: date,
              datasets: [{
                  label: 'Bitcoin Price Index',
                  data: price, 
                  backgroundColor: 'rgba(255, 99, 132, 0.2)',
                  borderColor: 'rgba(255, 99, 132, 1)',
                  borderWidth: 1
              }]
          }
      });
    }