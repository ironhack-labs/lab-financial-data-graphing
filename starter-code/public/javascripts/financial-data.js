class FinancialData {
    constructor(baseURL) {
        this.baseURL = baseURL
    }

    getData() {
        // console.log(axios.get(`${this.baseURL}`))
        return axios.get(`${this.baseURL}`)
    }
}



window.onload = function () {
    // let promises = financialApi.getData();
    // Promise.all(promises)
    //     .then((values, keys) => {
    //         const data = keys.map(obj => Object.keys(obj));
    //         const labels = values.map(obj => Object.values(obj));
    //         printChart(labels, data);
    //     });
    var financialApi = new FinancialData("http://api.coindesk.com/v1/bpi/historical/close.json");
    financialApi.getData().then(res => {
        const bpi = res.data.bpi;
        const labels= Object.keys(bpi);
        const data  = Object.values(bpi);
        printChart(labels, data)
    })

};


// const get100 = () => {
//     const pokeApi = new PokeApi('https://pokeapi.co/api/v2/pokemon/');
//     const promisesArray = [];
//     for (let i = 1; i <= 10; i++) {
//         promisesArray.push(pokeApi.getPokemon(i).then(res => res.data));
//     }
//     return promisesArray;
// };

const printChart = (labels, data) => {
    const ctx = document.getElementById('myChart').getContext('2d');

    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels,
            datasets: [{
                label: 'bpi',
                backgroundColor: 'rgba(50,143,80,0.74)',
                data,
            }],
        },
    });
};




const getData = (fromDate, toDate, currency) => {
    axios
        .get(
            `http://api.coindesk.com/v1/bpi/historical/close.json?start=${fromDate}&end=${toDate}&currency=${currency}`
        )
        .then(response => {
            const labels = Object.keys(response.data.bpi);
            const values = Object.values(response.data.bpi);
            const maxValue = Math.max(...values);
            const minValue = Math.min(...values);
            document.querySelector(".max").innerHTML = maxValue;
            document.querySelector(".min").innerHTML = minValue;
            document.querySelectorAll(".currency").innerHTML = document.querySelector(
                "select"
            ).value;
            printChart(labels, values);
        });
};

document.getElementById("to-date").onchange = () => {
    let fromDate = document.getElementById("from-date").value;
    let toDate = document.getElementById("to-date").value;
    let currency = document.querySelector("select").value;

    getData(fromDate, toDate,currency);
};

document.querySelector("select").onchange = () => {
    let fromDate = document.getElementById("from-date").value;
    let toDate = document.getElementById("to-date").value;
    let currency = document.querySelector("select").value;
    getData(fromDate, toDate, currency);
};