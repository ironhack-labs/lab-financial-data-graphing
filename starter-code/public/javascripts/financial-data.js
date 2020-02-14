let queryParams = {};

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
// Auxiliar Functions
// --------------------------------------------

const addRemoveParams = function (element) {
    const idAttribute = element.target.attributes.id.value;
    const filterName = idAttribute.replace('filter-', '');

    if (element.target.value)
        queryParams[filterName] = element.target.value;
    else
        delete queryParams[filterName]
}

const limitMaxDate = function () {
    const today = moment().format('YYYY-MM-DD')

    document.querySelector('#filter-start').setAttribute('max', today);
    document.querySelector('#filter-end').setAttribute('max', today);
}

const areDatesValid = function () {
    const startDate = document.querySelector('#filter-start');
    const endDate = document.querySelector('#filter-end');

    let startDateValue = moment(startDate.value);
    let endDateValue = moment(endDate.value);

    return endDateValue.isAfter(startDateValue);
}

const init = function () {
    fetchData();
    limitMaxDate();
}


// --------------------------------------------
// Filters
// --------------------------------------------
const filters = [...document.querySelectorAll('input, select')];

filters.forEach( input => {
    input.addEventListener('change', e => {

        addRemoveParams(e);

        if (!!queryParams.start && !!queryParams.end && !areDatesValid())
            console.error('Invalid date range!');

        fetchData(queryParams);
    })
})



// --------------------------------------------
// Axios config
// --------------------------------------------
const resource = axios.create({
    baseURL: 'https://api.coindesk.com/v1/bpi',
    timeout: 5000
});


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
// Get data
// --------------------------------------------
const fetchData = function (params = {}) {
    resource.get('/historical/close.json', { params })
        .then(function (res) {
            const response = res.data.bpi;
            chart.data.labels = Object.keys(response).map(year => year);
            chart.data.datasets[0].data = Object.values(response).map(val => val);
            chart.update();
        });
}


// --------------------------------------------
// Initial fetch
// --------------------------------------------
init();