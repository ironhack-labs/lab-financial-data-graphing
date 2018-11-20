//  window.onload =  function() {
    function ajaxRecuest() {
        axios.get('https://api.coindesk.com/v1/bpi/historical/close.json')
        .then((coinData)=> {
            console.log(coinData.data.bpi);
        })
    }
    ajaxRecuest();
// }