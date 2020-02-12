class CoinApi {
    constructor(url){
        this.url = url;
    }

    getCoin(){
        return axios.get(`${this.url}${}`)
    }
}