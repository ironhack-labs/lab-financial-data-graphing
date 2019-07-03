const canvas = document.querySelector("#myCanvas")
const ctx = canvas.getContext('2d')


function change(dateIni, dateFin) {
    dateIni = document.querySelector('#ini').value
    dateFin = document.querySelector('#fin').value
    axios.get((`http://api.coindesk.com/v1/bpi/historical/close.json?start=${dateIni}&end=${dateFin}`))
        .then(({
            data
        }) => {
            const mydata = Object.values(data.bpi)
            const keys = Object.keys(data.bpi)
            const myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: keys,
                    datasets: [{
                        label: 'Bitcoin Price',
                        data: mydata,

                    }]
                },
            })
        }).catch(err => console.log(err))
}

change()