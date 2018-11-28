const restCountriesApi = axios.create({
    baseURL: 'https://restcountries.eu/rest/v2/name/'
})

function getCountryInfo(theName){
    restCountriesApi.get(theName)
    .then(responseFromApi=>{
        console.log('Response is: ', responseFromApi.data)
    })
    .catch(e=>{
        console.log(e)
    })
}

document.getElementById("theButton").onclick = function(){
    const country = document.getElementById("theInput").value
    geyCountryInfo(country)
}