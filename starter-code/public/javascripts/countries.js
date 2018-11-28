// index.js

const restCountriesApi = axios.create({
  baseURL: 'https://restcountries.eu/rest/v2/name/'
});

function getCountryInfo(theName) {
  restCountriesApi.get(theName)
  .then(responseFromAPI => {
      console.log('Response from API is: ', responseFromAPI.data);           
})
.catch(err => {
  console.log('Error is: ', err);
  })
}

document.getElementById("theButton").onclick = function(){
  const country = document.getElementById("theInput").value;       
  getCountryInfo(country);
}