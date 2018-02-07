$(document).ready(() => {
    const c = document.getElementById("myCanvas");
    const ctx = c.getContext("2d");

    $("#form").change(() => {
        baseURL = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${document.getElementById("dateStart").value}&end=${document.getElementById("dateEnd").value}`;
        axios
            .get(baseURL)
            .then(res => {
                let myChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: Object.keys(res.data.bpi),
                        datasets: [{
                            label: 'See data Bitcoin',
                            data: Object.values(res.data.bpi),
                            backgroundColor: [
                                'rgba(255, 159, 64, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255, 159, 64, 1)'
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {}
                });

            })
            .catch(err => {
                console.error(err)
            })
    });

});
