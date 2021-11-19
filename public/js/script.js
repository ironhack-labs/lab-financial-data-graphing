const API_URL = "http://api.coindesk.com/v1/bpi/historical/close.json";

var fromDate, toDate;
var currency = 'USD';

document.getElementsByName("fromDate")[0].addEventListener('change', changeFromDate);
document.getElementsByName("toDate")[0].addEventListener('change', changeToDate);
document.addEventListener(
    "DOMContentLoaded",
    () => {
        axios.get(API_URL)
            .then(response => {
                draw(response.data.bpi)
            })
            .catch(err => console.log(err));
    },
    false
);

function changeFromDate() {
    fromDate = this.value;
    const url = (fromDate && toDate && currency) &&
        `${API_URL}?start=${fromDate}&end=${toDate}&currency=${currency}` ||
        `${API_URL}`

    retrieveDataAndUpdate(url);
}

function changeToDate() {
    toDate = this.value;
    const url = (fromDate && toDate) &&
        `${API_URL}?start=${fromDate}&end=${toDate}&currency=${currency}` ||
        `${API_URL}`

    retrieveDataAndUpdate(url);
}

function changeCurrency(event) {
    currency = event.target.value;
    const url = (fromDate && toDate) &&
        `${API_URL}?start=${fromDate}&end=${toDate}&currency=${currency}` ||
        `${API_URL}?currency=${currency}`

    retrieveDataAndUpdate(url);
}

function retrieveDataAndUpdate(url) {
    axios.get(url)
        .then(response => {
            update(response.data.bpi)
        })
        .catch(err => console.log(err));
}
