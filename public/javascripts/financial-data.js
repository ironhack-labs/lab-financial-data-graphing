let fromDate = "2010-07-17";
let toDate = "2020-09-10";

document.querySelector("#startDate").value = fromDate;
document.querySelector("#endDate").value = toDate;

const updateChart = (fromDate, toDate) => {
    const apiUrl = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${fromDate}&end=${toDate}`;



    axios
        .get(apiUrl)
        .then(res => {
            const bpiData = res.data.bpi;
            const xAxis = Object.keys(bpiData);
            const yAxis = Object.values(bpiData);
            console.log({
                xAxis,
                yAxis
            });

            const ctx = document.getElementById('chartBPI');
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: xAxis,
                    datasets: [{
                        label: 'BitcoinPrice',
                        borderColor: 'teal',
                        data: yAxis,
                    }]
                }
            })
        })
        .catch(err => console.log(err));

}

const handleChange = (e) => {
    e.preventDefault();

    let inpStartDate = document.querySelector("#startDate").value;
    let inpEndDate = document.querySelector("#endDate").value;

    if(Date.parse(inpStartDate) < Date.parse(inpEndDate)) {
        updateChart(inpStartDate, inpEndDate);
    }
}

document.querySelector("#startDate").addEventListener('change', handleChange);
document.querySelector("#endDate").addEventListener('change', handleChange);

updateChart(fromDate, toDate);