let queryParams = {};
const today = moment().format('YYYY-MM-DD')
const startDate = document.querySelector('#filter-start');
const endDate = document.querySelector('#filter-end');

// --------------------------------------------
// Chart JS config
// --------------------------------------------
var ctx = document.getElementById('lineChart').getContext('2d');

var chart = new Chart(ctx, {
    type: 'line',
    data: {
        datasets: [{
            backgroundColor: '#f5f5f5',
            borderColor: 'rgb(255, 99, 132)',
            label: 'Bitcoin Price Index'
        }]
    },
    options: {}
});


// --------------------------------------------
// Axios config
// --------------------------------------------
const resource = axios.create({
    baseURL: 'https://api.coindesk.com/v1/bpi',
    timeout: 5000
});


// --------------------------------------------
// Auxiliar Functions
// --------------------------------------------
const updateMinMax = function (data) {
    document.querySelector('#min-value').innerHTML = Math.min(...data);
    document.querySelector('#max-value').innerHTML = Math.max(...data);
}

const addRemoveParams = function (element) {
    const idAttribute = element.target.attributes.id.value;
    const filterName = idAttribute.replace('filter-', '');

    if (element.target.value)
        queryParams[filterName] = element.target.value;
    else
        delete queryParams[filterName]
}

const dateConstrains = function () {
    startDate.setAttribute('max', today);
    endDate.setAttribute('max', today);

    startDate.value ?
        endDate.setAttribute('min', startDate.value) :
        endDate.setAttribute('min', '');

    endDate.value ?
        startDate.setAttribute('max', endDate.value) :
        startDate.setAttribute('max', today);

}

const areDatesValid = function () {
    let startDateValue = moment(startDate.value);
    let endDateValue = moment(endDate.value);

    return endDateValue.isSameOrAfter(startDateValue);
}

const init = function () {
    fetchData();
    dateConstrains();
}


// --------------------------------------------
// Filters
// --------------------------------------------
const filters = [...document.querySelectorAll('input, select')];

filters.forEach( input => {
    input.addEventListener('change', e => {

        addRemoveParams(e);
        dateConstrains();

        if (!!queryParams.start && !!queryParams.end && !areDatesValid())
            console.error('Invalid date range!');

        fetchData(queryParams);
    })
})


// --------------------------------------------
// Get currencies for select field
// --------------------------------------------
resource.get('/currentprice.json')
    .then(function (res) {
        const response = res.data.bpi;
        currencies = Object.keys(response);

        currencies.forEach(currency => {
            let option = document.createElement('option');
            option.value = currency;
            option.innerHTML = currency;

            document.querySelector('#filter-currency').appendChild(option);
        });
    });


// --------------------------------------------
// Fetch data
// --------------------------------------------
const fetchData = function (params = {}) {
    resource.get('/historical/close.json', { params })
        .then(function (res) {
            const response = res.data.bpi;
            const labels = Object.keys(response).map(year => year);
            const values = Object.values(response).map(val => val.toFixed(2));

            updateMinMax(values);

            chart.data.labels = labels;
            chart.data.datasets[0].data = values;
            chart.update();
        });
}


// --------------------------------------------
// Initial fetch
// --------------------------------------------
init();