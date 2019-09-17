class BitcoinAPI {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }
  getBitcoinInfo (startDate, endDate) {
    return axios.get(`${this.baseUrl}?start=${startDate}&end=${endDate}`)
  }
}