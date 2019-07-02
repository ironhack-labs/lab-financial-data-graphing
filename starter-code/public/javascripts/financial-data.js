let link = "https://api.coindesk.com/v1/bpi/historical/close.json"

let initialDate = undefined;
let finalDate = undefined

let labelsJson = []
let dataJson = []
let myChart



axios
    .get("https://api.coindesk.com/v1/bpi/historical/close.json")
    .then(JSONPayload => {
        var ctx = document.getElementById('myChart').getContext('2d');
        myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: Object.keys(JSONPayload.data.bpi),
                datasets: [{
                    label: 'Bitcoin Price Index',
                    data: Object.values(JSONPayload.data.bpi),

                    borderWidth: 1
                }]
            },
            options: {}
        });
    })

document.getElementById("getAPIInfo").onclick = function() {
    initialDate = document.getElementById("InitialDate").value
    finalDate = document.getElementById("FinalDate").value
    link = link + "?start=" + initialDate + "&end=" + finalDate
    UpdateData()
};


function UpdateData() {
    axios
        .get(link)
        .then(JSONPayload => {
            var ctx = document.getElementById('myChart').getContext('2d');
            myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: Object.keys(JSONPayload.data.bpi),
                    datasets: [{
                        label: 'Bitcoin Price Index',
                        data: Object.values(JSONPayload.data.bpi),

                        borderWidth: 1
                    }]
                },
                options: {}
            });
        })
}