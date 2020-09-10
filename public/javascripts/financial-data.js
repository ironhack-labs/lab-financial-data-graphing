const apiUrl = 'http://api.coindesk.com/v1/bpi/historical/close.json'

const getData = (url) => { 
    axios
        .get(url)
        .then(response => {
           //console.log(Object.values(response.data.bpi));
           //console.log(Object.keys(response.data.bpi));
            printTheChart(response);
        })
        .catch(err => {
            console.log('Error while getting the data', err);
        })
}

const printTheChart = (response) => {


    const ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: Object.keys(response.data.bpi),
            datasets: [
                {
                    label: 'Stock Chart',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: Object.values(response.data.bpi)
                }

            ]
        }
    })
}

document.querySelector('#start').addEventListener('change', (event) => {
    getStartEnd()
})


document.querySelector('#end').addEventListener('change', (event) => {
    getStartEnd()
})

const getStartEnd = () => {
    const userInputStart = document.getElementById('start').value;
    const userInputEnd = document.getElementById('end').value;
    console.log(userInputEnd)
    const newURL = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${userInputStart}&end=${userInputEnd}`
    getData(newURL)
}

getData(apiUrl)