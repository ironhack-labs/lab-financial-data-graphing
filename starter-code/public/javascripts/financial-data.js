let datestart, dateEnd;
let ticket = ""
let apiurl = `http://api.coindesk.com/v1/bpi/historical/close.json`
let chart = undefined

document.querySelector("#dateStart").onchange = function() {
    var mindate = document.querySelector("#dateStart").value
    document.querySelector("#dateEnd").setAttribute("min", mindate);
}

document.querySelector("#dateEnd").onchange = function() {
    var maxdate = document.querySelector("#dateEnd").value
    document.querySelector("#dateStart").setAttribute("max", maxdate);
}

document.querySelector("#applyDates").onclick = function() {
    datestart = document.querySelector("#dateStart").value
    dateEnd = document.querySelector("#dateEnd").value
    ticket = document.querySelector("#money").value

    document.querySelector("#dateStart").removeAttribute("max");
    document.querySelector("#dateEnd").removeAttribute("min");


    var date = false;
    console.log(datestart)
    console.log(dateEnd)

    if (datestart !== "" || dateEnd !== "") {
        apiurl += `?start=${datestart}&end=${dateEnd}`
        date = !date;
    }
    if (ticket !== "") {
        if (date) {
            apiurl += `&currency=${ticket}`
        } else {
            apiurl += `?currency=${ticket}`
        }

    }
    console.log(apiurl);
    draw(apiurl, chart);
}



// document.getElementById("money").onchange = function(e) {
// ticket = e.target.value
// }
// axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json`)
// axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=2013-09-01&end=2019-04-15`)
// axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?index=EUR`)



function draw(apiurl, chart) {
    axios.get(apiurl)
        .then(bitcoindata => {
            bitcoindata = bitcoindata.data.bpi
            var X1 = Object.keys(bitcoindata);
            var Y1 = Object.values(bitcoindata);

            document.getElementById("minValor").value = Math.min.apply(Math,Y1);
            document.getElementById("maxValor").value = Math.max.apply(Math,Y1);

            const ctx = document.getElementById("myChart").getContext('2d');

            if (chart) chart.destroy()

            chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: X1,
                    datasets: [{
                        label: "Axis X",
                        borderWidth: 2,
                        borderColor: 'rgb(255, 0, 0)',
                        data: Y1,
                    }]
                }
            })
        })
        .catch(error => {
            console.log(error);
        })
    apiurl = `http://api.coindesk.com/v1/bpi/historical/close.json`
}

// }