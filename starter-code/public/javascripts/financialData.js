
function initChart (start,end,curr){

    const url = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}&index=${curr}`;

    fetch(url)
    .then (res=>{
        if(!res.ok) return Promise.reject(res.statusText);
        return res.json()
    })
    .then(data=>{
        printTheChart(data);
    })
    .catch(e=>console.log(e))


    let printTheChart = ((data) => {

    let keys = Object.keys(data.bpi)
    let values = Object.values(data.bpi)

    let ctx = document.getElementById('myChart').getContext('2d');
    let chart = new Chart(ctx, {
        type: 'line',
        data: {
        labels: keys,
        datasets: [{
            label: "Stock Chart",
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: values,
        }]
        }
    });
    });

}

initChart("2017-01-01","2017-12-31","USD");

let button = document.getElementById("check");

button.addEventListener("click", ()=>{
    let from = document.getElementById("from").value;
    let to = document.getElementById("to").value;
    let curr = document.getElementById("curr").value;
    initChart(from,to,curr);
})


