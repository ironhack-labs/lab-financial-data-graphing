const BPI_API_URL_BASE = "http://api.coindesk.com/v1/bpi/historical/close.json";

function getFinancialData(currency = "USD", start, end) {
    return axios.get(`${BPI_API_URL_BASE}?currency=${currency}&start=${start}&end=${end}`).then((response) => {
        return response.data;
    }).catch((error) => {
        console.log("error", error)
    });
}
