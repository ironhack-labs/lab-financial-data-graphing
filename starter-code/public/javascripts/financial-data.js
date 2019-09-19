const updateInfo = (startDate, endDate, currency) => {

    let baseUrl = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}&currency=${currency}`;
    console.log(baseUrl);
    const askprices = axios.create({
        baseURL: baseUrl
    });
    return askprices;
}


const format = (value) => {

    return value.toFixed(2);

}
const updateMaxMin = (max, min) => {
    document.querySelector(".max").innerText = `MAX: ${format(max)} USD`;
    document.querySelector(".min").innerText = `MIN: ${format(min)} USD`;
}

const printTheChart = (stockData => {
    const labels = Object.keys(stockData);
    const values = Object.values(stockData);
    updateMaxMin(Math.max.apply(null, values), Math.min.apply(null, values));

    const ctx = document.getElementById('myChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: "Bitcoin Price index",
                backgroundColor: 'rgb(82, 137, 196)',
                borderColor: 'rgb(255, 99, 132)',
                data: values,
                borderWidth: 5

            }]
        }
    });
});

const getValues = () => {
    const dateFrom = document.querySelector("#dataFrom");
    const dateTo = document.querySelector("#dataTo");
    const select = document.getElementById("select");

    dateTo.setAttribute("min", generateDayAfter(new Date(dateFrom.value)));

    updateInfo(dateFrom.value, dateTo.value, select.value).get()
        .then(response => {
            printTheChart(response.data.bpi);
        })
        .catch(error => {
            console.log(error);
        });

}

const formatDate = (date) => {
    return date.toISOString().slice(0, 10);
}

const generateDay = (date, timestamp) => {
    let anotherDay = new Date(date.getTime() - timestamp);
    return formatDate(anotherDay);
}

const generateDayAfter = (date) => {
    let anotherDay = new Date(date.getTime() + 86461654);
    return formatDate(anotherDay);
}

const setupTime = () => {
    let minDateFrom = new Date("September 18 2013");
    let minDateTo = new Date("September 19 2013");
    let oneMonthAgoTimestamp = 2505627479;
    let oneDayBefore = 86461654;
    const dateFrom = document.querySelector("#dataFrom");
    const dateTo = document.querySelector("#dataTo");
    const select = document.getElementById("select");
    let today = new Date();
    let lastMonth = generateDay(today, oneMonthAgoTimestamp);
    let todayFormated = formatDate(today);
    dateFrom.value = lastMonth;
    dateTo.value = todayFormated;
    dateTo.setAttribute("min", formatDate(minDateFrom));
    dateFrom.setAttribute("min", formatDate(minDateTo));
    dateTo.setAttribute("max", todayFormated);
    dateFrom.setAttribute("max", generateDay(today, oneDayBefore));

    dateFrom.onchange = getValues;
    dateTo.onchange = getValues;
    select.onchange = getValues;

}

window.onload = function () {

    setupTime();
    getValues();
}

// document.getElementById("dateFrom").addEventListener("change", (e) => {
//     var input = e.target.value;
//     console.log(input); //e.g. 2015-11-13
//     var date = new Date();
//     date.
//     console.log(dateEntered); //e.g. Fri Nov 13 2015 00:00:00 GMT+0000 (GMT Standard Time)
// });

// const dateTo = document.getElementById("dateTo");
// dateTo.addEventListener("change", (e) => {
//     var input = e.target.value;
//     console.log(input); //e.g. 2015-11-13
//     console.log(dateEntered); //e.g. Fri Nov 13 2015 00:00:00 GMT+0000 (GMT Standard Time)
// });

// document.getElementById("pokeButton").onclick = function (e) {
//     e.preventDefault();
//     const mypoke = document.getElementById("pokeInput").value;
//     poks(mypoke);


// }


// const pokemon = axios.create({
//     baseURL: 'https://pokeapi.co/api/v2/pokemon'
// });
// const restCountriesApi = axios.create({
//     baseURL: 'https://restcountries.eu/rest/v2/name/'
// });
// function createDiv() {
//     errDiv = document.createElement("div");
//     errDiv.setAttribute("id", "error");
//     document.body.appendChild(errDiv);
// }

// function removeErrDiv() {
//     if (document.getElementById("error")) {
//         const error = document.getElementById("error");
//         error.parentNode.removeChild(error);
//     }
// }

// function removeCountryInfo() {
//     document.getElementById("countryName").innerHTML = "";
//     document.getElementById("countryCapital").innerHTML = "";
// }


// function checkInput() {
//     removeErrDiv();
//     if (document.getElementById("theInput").value === "") {
//         document.getElementById('theButton').disabled = true;
//         removeCountryInfo();
//         createDiv();
//         const theErr = document.createTextNode(`Wanna input something? 🤪`);
//         errDiv.appendChild(theErr);
//     } else {
//         document.getElementById('theButton').disabled = false;
//     }
// }





// function getCountryInfo(theName) {
//     restCountriesApi.get(theName)
//         .then(responseFromAPI => {
//             removeErrDiv();
//             const countryName = responseFromAPI.data[0].name;
//             const countryCapital = responseFromAPI.data[0].capital;

//             // instead in the console, show data in the browser using JS DOM manipulation:
//             document.getElementById("countryName").innerHTML = countryName;
//             document.getElementById("countryCapital").innerHTML = "Capital: " + countryCapital;
//         })
//         .catch(err => {
//             if (err.response.status === 404) {
//                 removeCountryInfo();
//                 createDiv();
//                 const theErr = document.createTextNode(`What the heck is ${theName}? 🤭`);
//                 errDiv.appendChild(theErr);
//             } else {
//                 console.log('err => ', err)
//             }
//         })
// }

// let divPok = document.getElementById("here");


// const poks = (item) => {
//     // try {
//     //     const answer = await pokemon.get();
//     //     console.log(answer);
//     // } catch (err) {
//     //     console.log(err);
//     // }
//     pokemon.get(item)
//         .then(result => {
//             console.log(result.data);

//             divPok.innerHTML = `<img src="${result.data.sprites.back_default}" alt="">`;
//         }).catch(err => {
//             console.log(err);
//         })

// }
// document.getElementById("theButton").onclick = function (e) {
//     e.preventDefault();
//     const country = document.getElementById("theInput").value;
//     getCountryInfo(country);
//     // poks();

// }