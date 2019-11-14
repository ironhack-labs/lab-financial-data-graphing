// const getBitData = (startDate, endDate, value) => {

const getData = (minDate, maxDate, value)
axios
    .get(
    `http://api.coindesk.com/v1/bpi/historical/close.json?start=${minDate}&end=${maxDate}&currency=${value}`) // 
    .then(res => {
        // console.log(response)
        const dates = Object.keys(res.data.bpi).map(el => {
            return el;
    })
    const closes = Object.values(res.data.bpi).map(el => {
        return el;
    })
    document.getElementById('minVal').innerText = Math.min(...values).toString(); // ...values???
    document.getElementById('maxVal').innerText = Math.min(...values).toString();
    
    // const maxVal = Math.max(...closes);

     drawCanvas(dates, closes)
    })
    .catch(err => {
        console.log(err);
    })

// }

    const drawCanvas = (xAxis, yAxis) => {
        const ctx = document.getElementById("myChart").getContext("2d");

        new Chart(ctx, {
            type: "line",
            data: {
                labels: xAxis,
                datasets: [{
                    backgroundColor: 'beige',
                    label: "Bitcoin chart",
                    data: yAxis
                }]
            }
        })
    }


    document.querySelector('button').onclick = () => {
        const from = document.getElementById("minDate").value;
        const to = document.getElementById("maxDate").value;
        // console.log("LOOOOOOOK", to)
        const currency = "EURO" // document.getElementById("currency").value;
        // console.log(currency);
        getBitData(from, to, currency);

    }