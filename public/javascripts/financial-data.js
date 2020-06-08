const $elements = document.querySelectorAll(".input")

$elements.forEach(el=>{
  el.addEventListener("change", ()=>{
    const $currency = document.querySelector("#currency");
    const $startDate = document.querySelector("#startDate");
    const $endDate = document.querySelector("#endDate");
    
    const apiUrl = `http://api.coindesk.com/v1/bpi/historical/close.json?currency=${$currency.value}&start=${$startDate.value}&end=${$endDate.value}`;
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
    const max = Math.max(...price);
    const min = Math.min(...price);
    const $max = document.querySelector(".value-max");
    const $min = document.querySelector(".value-min");
    const $currency = document.querySelector("#currency");
    $max.innerHTML = `${max} ${$currency.value}`;
    $min.innerHTML = `${min} ${$currency.value}`;
}