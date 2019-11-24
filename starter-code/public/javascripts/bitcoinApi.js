class BitcoinApi {
    constructor(url) {
      this.url = url;
    }
    getData(dateStart, dateEnd,currency) {
     return axios.get(`${this.url}?start=${dateStart}&end=${dateEnd}&currency=${currency}`)
  
    }
  }