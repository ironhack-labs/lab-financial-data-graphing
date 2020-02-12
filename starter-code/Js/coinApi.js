class CoinApi {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  getCoin(number) {
    return axios.get(`${this.baseURL}${number}`);
  }
}
