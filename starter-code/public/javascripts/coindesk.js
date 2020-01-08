export const getData = async (path = '/historical/close.json', queryParams = '') => {
  try {
    const baseURL = 'http://api.coindesk.com/v1/bpi';
    const endpoint = baseURL+path+queryParams;
    const {data} = await axios.get(endpoint);
    const {bpi} = data;
    const labels = Object.keys(bpi);
    const values = Object.values(bpi);
    return {
      labels,
      values,
    };
  } catch (error) {
    console.log(error)
  }
};

export const getCurrencies = async () => {
  const endpoint = 'http://api.coindesk.com/v1/bpi/supported-currencies.json';
  const data = await axios.get(endpoint);
  console.log(data)
}