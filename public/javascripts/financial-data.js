const api = axios.create({
    baseURL: 'http://api.coindesk.com/v1/bpi',
});

const fetchHistoricalData = async () => {
    try {
        const { data } = await api.get('/historical/close.json');
        return data
    } catch (error) {
        console.error(error);
    }
}


const getHistoricalData = async () => {
    const result = await fetchHistoricalData()
    console.log(result)
}

getHistoricalData()
