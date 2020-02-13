window.onload = () => {
    axios.get('http://api.coindesk.com/v1/bpi/historical/close.json')
      .then(res => {
        res = res.data.bpi
        const keys = Object.keys(res);
        const values = keys.map(k => res[k])
        generateChart(keys, values);
      })
      .catch(function (error) {
        console.log(error);
      });
}

function generateChart(labels, data) {
    const ctx = document.getElementById('financial-chart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: 'rgba(28,55,92, 0.4)',
                borderColor: 'rgba(28,55,92)',
                borderWidth: 2
            }]
        }
    });

}

