let $inputLeft = document.querySelector("#input-left").value;
let $inputRight = document.querySelector("#input-right").value;
let $button = document.querySelector("#button")

dataInfo()
function dataInfo() {
    axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${$inputLeft}&end=${$inputRight}`)
    .then((response) => {
        var ctx = document.getElementById('myChart').getContext('2d');
        var chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'line',

            // The data for our dataset
            data: {
                labels:Object.keys(response.data.bpi) ,
                datasets: [{
                    label: 'Bitcoin API',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: Object.values(response.data.bpi)
                }]
            },

            // Configuration options go here
            options: {}
        });
        console.log(response);
    })
    .catch(function (error) {

        console.log(error);
    })

}

$button.addEventListener("click",dataInfo)

