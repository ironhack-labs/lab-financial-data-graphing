
// const axios = require("")

// const finanApi = axios.create({
//     baseURL: "http://api.coindesk.com/v1/bpi/historical/close.json",
// })


// finan.get("/", (req, res, next) => {
// console.log(baseURL.bpi)

// })
axios.get('http://api.coindesk.com/v1/bpi/historical/close.json')
    .then(function (response) {
        console.log(response.data);
    })
    .catch(function (error) {
        console.log(error);
    });