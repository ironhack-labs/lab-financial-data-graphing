const data = async () => {
    try {
        const response = await axios.get('http://api.coindesk.com/v1/bpi/historical/close.json');
        console.log(response.data.bpi); //se ve en la consola del navegador
        // const bpi = response.data.bpi;
        // document.getElementById('value').innerText = bpi; //pasamos "value" para poderla llamar desde index
    } catch (error){
        console.log(error)
    }
}

data();