const getData=()=>{
    return axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json`)
    .then((data)=>{
        console.log(data);
    }).catch(e=>console.log(e))
}
getData();