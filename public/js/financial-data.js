// api
  const getData = async (startDate, endDate) => {
    const endpoint = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`;
    const dataFromApi = await axios.get(endpoint);
    console.log(dataFromApi.data.bpi);
  }



const result = getData('2013-09-01', '2013-09-05');


