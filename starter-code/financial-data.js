const financialData = axios.create({
    baseURL: 'http://api.coindesk.com/v1/bpi/historical/close.json'
})

financialData.get()
    .then(response =>
        console.log(response))
    .catch(error => {
        console.log(error);
    });