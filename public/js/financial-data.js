var chart;

function draw(bpi) {
    const ctx = document.getElementById('myChart').getContext('2d');

    let values_X = Object.keys(bpi);
    let values_Y = Object.values(bpi);

    const data = {
        type: 'line',
        data: {
            labels: values_X,
            datasets: [
                {
                    label: `BPI in ${currency}`,
                    backGroundColor: 'rgb(176,103,103)',
                    borderColor: 'rgb(38,33,33)',
                    data: values_Y
                }
            ]
        }
    };
    chart = new Chart(ctx, data)

    updateMinAndMax(Math.min(...values_Y), Math.max(...values_Y));
}

function update(bpi) {
    removeData();
    updateData(genData(bpi));
    updateMinAndMax();
}

function genData(bpi) {
    let values_X = Object.keys(bpi);
    let values_Y = Object.values(bpi);

    updateMinAndMax(Math.min(...values_Y), Math.max(...values_Y));

    return {
        type: 'line',
        data: {
            labels: values_X,
            datasets: [
                {
                    label: `BPI in ${currency}`,
                    backGroundColor: 'rgb(176,103,103)',
                    borderColor: 'rgb(38,33,33)',
                    data: values_Y
                }
            ]
        }
    };
}

function updateData(data) {
    chart.data.labels = data.data.labels;
    chart.data.datasets = data.data.datasets;
    chart.update();
}

function removeData() {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
    chart.update();
}

function updateMinAndMax(min, max) {
    document.querySelector('#min > span').innerText = min;
    document.querySelector('#max > span').innerText = max;
}