let stockLabels = [];
let stockPrice = [];

axios({
    method: "Get",
    url: "http://api.coindesk.com/v1/bpi/historical/close.json",
    params: ""
})

var coinApi = axios.create({
    baseURL: "http://api.coindesk.com/v1/bpi/historical/close.json"
})

const getData = function(start,end) {
    if (arguments.length > 0) {
        coinApi= axios.create({
            baseURL:"http://api.coindesk.com/v1/bpi/historical/close.json"
            .concat("?start=" + start + "&end=" + end)
        })
    }
    return coinApi.get();
}

let printTheChart = (() => {
    // let stockLabels = stockData.map(element => element.date);
    // let stockPrice = stockData.map(element => element.close);
    let ctx = document.getElementById('myChart').getContext('2d');
    let chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: stockLabels,
            datasets: [{
                label: "Stock Chart",
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: stockPrice,
            }]
        }
    });
});

const transDate = (d) => {
    let date = new Date(d);
    let month= '' + (date.getMonth()+1);
    let day= '' + date.getDate();
    let year= '' + date.getFullYear();
    
    if(month.length<2) month = '0' + month;
    if(day.length<2) day = '0' + day;

    return [year,month,day].join('-');
}


getData() //iter 1
    .then(data => {
    stockLabels = Object.keys(data.data.bpi);
    stockPrice = Object.values(data.data.bpi);
    printTheChart()
    })
    .catch(err => console.log(err));

document.getElementById("add").addEventListener("click", () => {
    let startD = transDate(document.getElementById("datestart").value);
    let endD = transDate(document.getElementById("datend").value);
    // console.log(startD)
    // console.log(endD)
    
    //getData()  //iter 1
    getData(startD, endD) //iter 2

        .then(data => {
            //console.log(data);
            //console.log(Object.keys(data.data.bpi));
            stockLabels = Object.keys(data.data.bpi);
            // console.log(Object.values(data.data.bpi));
            stockPrice = Object.values(data.data.bpi);
            // console.log(stockLabels);
            // console.log(stockPrice);

            printTheChart()
        })

        .catch(err => console.log(err))
})



