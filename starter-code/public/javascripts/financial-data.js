

//get request for API


let firstUrl = 'http://api.coindesk.com/v1/bpi/historical/close.json'

function getData(url){
    fetch(url)
    .then(result=>{
        if(!result.ok) return Promise.reject(result.statusText);
        return result.json()
    })
        .then(data=>{
        sendData(data);
    })
    .catch(e=>console.log(e))
}

getData(firstUrl)



function sendData(dataObj){
    var dates = Object.keys(dataObj.bpi)
    var values = Object.values(dataObj.bpi)
    console.log(dates,values)
    draw(dates,values)
}

function draw(dates,values){
    let ctx = document.getElementById('myChart').getContext('2d');

    let chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: dates,
          datasets: [{
            label: "Bitcoin Value Chart",
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: values,
          }]
        }
        }); 
}

var button = document.getElementById('button');

button.addEventListener('click', ()=> {
    let currency = document.getElementById('currency').value;
    let start = document.getElementById('start').value;
    let end = document.getElementById('end').value;
    historicDates(start,end,currency);
})

function historicDates(start,end,iso){
    let url = 'https://api.coindesk.com/v1/bpi/historical/close.json?start=' + start + '&end='+ end + '&currency='+ iso;
    getData(url)
}


