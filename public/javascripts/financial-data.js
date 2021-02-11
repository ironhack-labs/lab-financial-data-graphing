
const constUrl = `http://api.coindesk.com/v1/bpi/historical/close.json`;
let apiUrl = ''

// axios.get(apiUrl)
//     .then(response => {
//         console.log(response.data.bpi);
//         printChart(response.data.bpi)
//     })
//     .catch(err => {
//         console.log(err);
//     })

//     const printChart = cryptoData => {
//         console.log(cryptoData);
//         // data for the x axis
//         const dates = Object.keys(cryptoData);
//         console.log(dates);
//         // this is the data for the y axis
//         const values = Object.values(cryptoData)
//         console.log(values);
//         const ctx = document.getElementById('myChart').getContext('2d');
//         new Chart(ctx, {
//             type: 'line',
//             data: {
//                 labels: dates,
//                 datasets: [
//                     {
//                         label: 'Stock Chart',
//                         backgroundColor: 'rgb(255, 99, 132)',
//                         borderColor: 'rgb(255, 99, 132)',
//                         data: values
//                     }
//                 ]
//             }
//         })
//     }

    function handler1(e){
      //  console.log('change1')
        const startDate = e.target.value;
        startURL(startDate)
      }

    function handler2(e){
      //  console.log('change2')
       const endDate = e.target.value;
       endURL(endDate)
      }

    function startURL(startDate) {
        if(apiUrl.length > 52) {
            const end = apiUrl.slice(69)
            console.log(end)
            apiUrl = `${constUrl}?start=${startDate}${end}`
        }
        else {
            apiUrl = `${constUrl}?start=${startDate}`
        }
    console.log(apiUrl)
    axios.get(apiUrl)
    .then(response => {
        console.log(response.data.bpi);
        printChart(response.data.bpi)
    })
    .catch(err => {
        console.log(err);
    })

    const printChart = cryptoData => {
        console.log(cryptoData);
        // data for the x axis
        const dates = Object.keys(cryptoData);
        console.log(dates);
        // this is the data for the y axis
        const values = Object.values(cryptoData)
        console.log(values);
        const ctx = document.getElementById('myChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: dates,
                datasets: [
                    {
                        label: 'Stock Chart',
                        backgroundColor: 'rgb(255, 99, 132)',
                        borderColor: 'rgb(255, 99, 132)',
                        data: values
                    }
                ]
            }
        })
    }
    }

    function endURL(endDate) {
        if(apiUrl.length > 52) {
            const startDate = apiUrl.substring(59,69)
            console.log(startDate)
            apiUrl = `${constUrl}?start=${startDate}&end=${endDate}`
        }
        else {
            alert('Pick a start date first')
        }
    console.log(apiUrl)
    
    axios.get(apiUrl)
    .then(response => {
        console.log(response.data.bpi);
        printChart(response.data.bpi)
    })
    .catch(err => {
        console.log(err);
    })

    const printChart = cryptoData => {
        console.log(cryptoData);
        // data for the x axis
        const dates = Object.keys(cryptoData);
        console.log(dates);
        // this is the data for the y axis
        const values = Object.values(cryptoData)
        console.log(values);
        const ctx = document.getElementById('myChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: dates,
                datasets: [
                    {
                        label: 'Stock Chart',
                        backgroundColor: 'rgb(255, 99, 132)',
                        borderColor: 'rgb(255, 99, 132)',
                        data: values
                    }
                ]
            }
        })
    }
    }


    // http://api.coindesk.com/v1/bpi/historical/close.json?start=2021-01-01&end=2021-01-02