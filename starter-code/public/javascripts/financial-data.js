function AJAXRequest(fechaini, fechafin) {
    axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${fechaini}&end=${fechafin}`)
        .then((data) => {
            print(data.data.bpi)
        })
        .catch(err => console.log(err))
}

function print(data) {
    let keys = Object.keys(data)
    let values = Object.values(data)
    let ctx = document.getElementById('myChart').getContext('2d');
    let chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: keys,
            datasets: [{
                label: "My First dataset",
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: values
            }]
        }
    });
}

function printBetweenTimes(){
    const fechaini = document.getElementById('fechaini').value
    const fechafin = document.getElementById('fechafin').value
    AJAXRequest(fechaini, fechafin)
}

document.getElementById('getdata').onclick = printBetweenTimes