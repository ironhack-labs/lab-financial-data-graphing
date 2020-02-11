const data = async () => {
    try {
        const response = await axios.get('https://api.coindesk.com/v1/bpi/currentprice.json');
        console.log(response.data); //se ve en la consola del navegador
        const bpi = response.data.bpi.USD.rate_float;
        document.getElementById('value').innerText = bpi; //pasamos "value" para poderla llamar desde index
    } catch (error){
        console.log(error)
    }
}
data();