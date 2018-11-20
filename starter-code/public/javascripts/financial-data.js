// Ask if axios is already defined
const bitcoinChart = axios.create({
  baseURL: 'https://api.coindesk.com/v1/bpi/historical/close.json',
});

function getBitcoinChat() {
  bitcoinChart.get()
    .then(res => console.log(res.data.bpi))
    .catch(err => next(err));
}

getBitcoinChat();
