
const startDate = document.querySelector("#startDate").value
const endDate = document.querySelector("#endDate").value

const apiUrl = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`

async function updateChart(){
    const startDate = document.querySelector("#startDate").value
    const endDate = document.querySelector("#endDate").value
    const apiUrl =`http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`
    const {data} = await axios.get(apiUrl);
    //console.log(data);
    const bpi = data["bpi"];
    //console.log(bpi);
    const arrLabel = Object.keys(bpi)
    //console.log(arrLabel);
    const arrValues = Object.values(bpi)
    //console.log(arrValues);
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
}
const endDateTag = document.querySelector("#endDate")

endDateTag.addEventListener("change", updateChart)

// async function getAll(){
//     try{
//         const {data} = await axios.get(apiUrl);
//         //console.log("Data",data);
//     }catch(err){
//         console.error(err);
//     }
// }

async function showChart(){
    try{
        const {data} = await axios.get(apiUrl);
        //console.log(data);
        const bpi = data["bpi"];
        //console.log(bpi);
        const arrLabel = Object.keys(bpi)
        //console.log(arrLabel);
        const arrValues = Object.values(bpi)
        //console.log(arrValues);
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

showChart();