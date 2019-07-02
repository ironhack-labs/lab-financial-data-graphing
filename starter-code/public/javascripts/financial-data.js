let link = "https://api.coindesk.com/v1/bpi/historical/close.json"

let myChart

UpdateData()

document.getElementById("getAPIInfo").onclick = function() {
    let initialDate = document.getElementById("InitialDate").value
    let finalDate = document.getElementById("FinalDate").value
    let currency = document.getElementById("currency").value

    link = link + "?start=" + initialDate + "&end=" + finalDate + "&currency=" + currency
    UpdateData()
};


function UpdateData() {
    axios
        .get(link)
        .then(JSONPayload => {
            //Calculating max and min
            let collectionValues = Object.values(JSONPayload.data.bpi)
            const maxValueofBpi = Math.max(...collectionValues.map(maxvalue => maxvalue), 0);
            document.getElementById("maxvalue").innerHTML = "Max.Value =" + maxValueofBpi

            const minValueofBpi = Math.min(...collectionValues.map(minvalue => minvalue), maxValueofBpi);
            document.getElementById("minvalue").innerHTML = "Min.Value =" + minValueofBpi

            //printing the chart
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