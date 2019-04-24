var ctx = document.getElementById("myChart").getContext("2d");

function getData(){
    axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${setDate1()}&end=${setDate2()}&currency=${setCurrency()}`)
    .then()
    .catch(err => console.log(err))
}