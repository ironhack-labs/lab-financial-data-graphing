
// FIXME: esse baseURL não realmente faz sentido, porque o path da currency devolve um objeto com outra cara
export const getData = async (path = '/historical/close.json', queryParams = '') => {
  try {
    const baseURL = 'http://api.coindesk.com/v1/bpi';
    const endpoint = baseURL+path+queryParams;
    const {data} = await axios.get(endpoint);
    console.log('essa e a data bruta: ', data)
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

// TODO: não consegui fazer funcionar. CORS. Consigo fazer esse get no browser, no postman, no wget... Por que o script não consegue pegar esse json? =(
// export const getCurrencies = async () => {
//   try {
//     const endpoint = 'http://api.coindesk.com/v1/bpi/supported-currencies.json';
//     const data = await fetch(endpoint);
//     console.log(data)

//   } catch (error) {
//     console.log(error)
//   }
// }