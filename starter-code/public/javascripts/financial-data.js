const dateFromId = document.querySelector("#dateFrom");
const dateToId = document.querySelector("#dateTo");
function chartMaster() {
    const dateFrom = dateFromId.value;
    const dateTo = dateToId.value;
    const baseURL = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${dateFrom}&end=${dateTo}`;
    function getDataAndPrint(baseURL) {
        axios
            .get(baseURL)
            .then(dataPayload => {
                //console.log(dataPayload.data.bpi);
                printChart(dataPayload.data);
            })
            .catch(err => console.log(err));

        function printChart(data) {
            const dailyData = data["bpi"];
            const myKeys = Object.keys(dailyData);
            const myValues = myKeys.map(value => {
                return dailyData[value];
            });
            const ctx = document.getElementById("myChart").getContext("2d");
            const chart = new Chart(ctx,{
                type: "line",
                data:{
                    labels: myKeys,
                    datasets:[
                        {
                            label: "Value",
                            backgroundColor: "rgba(33, 136, 69, .1)",
                            borderColor: "rgb (159, 229, 179)",
                            fill: true,
                            data: myValues
                        }
                    ]
                }
            });
        }
    }
getDataAndPrint(baseURL);
}
dateFromId.addEventListener("change", chartMaster);
dateToId.addEventListener("change", chartMaster);
chartMaster();