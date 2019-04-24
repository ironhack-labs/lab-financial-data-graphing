function data() {
axios.get("http://api.coindesk.com/v1/bpi/historical/close.json?start=${firstDate()}&end=${secondDate()}&currency=${setCurrency()}")
.then(response =>{
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: Object.keys(response.data.bpi),
        datasets: [{
            label: '# of votes ',
            data: Object.keys(response.data.bpi),
            backgroundColor: [
                rgba(0,0,255,0.3)
            ],
            borderColor: [
                rgba(0,255,0,0.3)
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: Math.min(Object.values(response.data.bpi))
                }
            }]
        }
    }
})
})
.catch(err=>{
    console.log(err)
})
}

document.getElementById("start").addEventListener("click", function(){
    console.log("ya jala!")
  });

const button = document.getElementById("start")
button.addEventListener("click",data)

const dateOne = document.getElementById("dO")
dateOne.addEventListener("change", firstDate)
console.log(dateOne)

const dateTwo = document.getElementById("dT")
dateTwo.addEventListener("change", secondDate)

const currency = document.getElementById("currency")
currency.addEventListener("change", setCurrency)

function firstDate() {
    let date1 = dataOne.value
        let date1 = dateOne.value
        return date1 === ''? "2019-04-01": date1
    }


function secondDate() {
    let date2 = dateTwo.value
    return date2 === '' ? "2019-04-20" : date2
}

function setCurrency() {
    let currency = currency.value
    return currency
}