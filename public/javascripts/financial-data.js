const apiUrl = `http://api.coindesk.com/v1/bpi/historical/close.json`

async function showChart(url){
    try{
        const {data} = await axios.get(url);
        const bpi = data["bpi"];
        console.log(bpi);
        const arrLabel = Object.keys(bpi)
        const arrValues = Object.values(bpi)
        const max = Math.max(...arrValues).toFixed(2)
        const min = Math.min(...arrValues).toFixed(2)
        document.querySelector("#max").innerText = max
        document.querySelector("#min").innerText = min;

//-----------------------CHART-------------------------------------------//
        const ctx = document.querySelector("#canvas").getContext("2d");
        const chart = new Chart(ctx,{
            type:"line",
            data: {
                labels: arrLabel,
                datasets: [
                    {
                        label:"BTC",
                        backgroundColor:"yellow",
                        borderColor:"black",
                        data: arrValues
                    }
                ]
            }
        })
    }catch(err){
        console.error(err);
    }
}

//-----------Funcion that Update Chart--------------------//
async function updateChart(){
    const startDate = document.querySelector("#startDate").value
    const endDate = document.querySelector("#endDate").value
    const currency = document.querySelector("#currency").value
    const apiUrl = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}&currency=${currency}`
    showChart(apiUrl)
}

//---------Inicial data and function-----------//
showChart(apiUrl)


const endDateTag = document.querySelector("#endDate")
const currencyTag = document.querySelector("#currency")

endDateTag.addEventListener("change", updateChart)
currencyTag.addEventListener("change", updateChart)

