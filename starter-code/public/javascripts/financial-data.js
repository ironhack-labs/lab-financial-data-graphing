axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json`)
.then((countryData) => {

  console.log(countryData)
    // renderHTMLIronhack(new CountryData(countryData.data[0].name, countryData.data[0].callingCodes[0]))
})