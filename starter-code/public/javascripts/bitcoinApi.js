class BitcoinApi {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  getDate() {
    return axios.get(`${this.baseURL}`)
  }
}