
const button = document.querySelector("button")

button.addEventListener("click", () => {
    axios.get("http://api.coindesk.com/v1/bpi/historical/close.json?start=2021-01-01&end=2022-12-31")
    .then(responseFromApi => console.log("this is what we get from the API", responseFromApi))
    .catch(error => console.log("Stg went wrong",error))
})



