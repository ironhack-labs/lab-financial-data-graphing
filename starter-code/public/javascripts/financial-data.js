$(document).ready(function () {
    
    axios.get('http://api.coindesk.com/v1/bpi/historical/close.json')
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        })

})


