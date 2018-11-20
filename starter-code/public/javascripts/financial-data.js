

document.getElementById('getCountryData').onclick = countryDataClickHandler;

function makeCountryAJAXRequest() {
    // let chosenCurrency = document.querySelector('#').value
    
    axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json`)
    .then((x) => {
        console.log(x) 
        // renderHTMLIronhack(new CountryData(countryData.data[0].name, countryData.data[0].callingCodes[0]))
    })
    }


    function countryDataClickHandler() {
        makeCountryAJAXRequest()
    }

    