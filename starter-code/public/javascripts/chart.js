

var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    type: 'line',

    data: {
        labels: [2017-08-14, 2017-08-13, 2017-08-12],
        datasets: [{
            label: "Bitcoin value",
            backgroundColor: 'rgb(255, 99, 25)',
            borderColor: 'rgb(255, 99, 132)',
            data: [3917.6488, 4111.1963, 4382.7413],
        }]
    },

    options: {}
});
