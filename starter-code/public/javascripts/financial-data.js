const baseURL = "http://api.coindesk.com/v1/bpi/historical/close.json";

axios
    .get(baseURL)
    .then(dataPayload => {
        console.log(dataPayload.data);
        printChart(dataPayload.data);
    })
    .catch(err => console.log(err));

function printChart(data) {
    const dailyData = data["bpi"];
    const myKeys = Object.keys(dailyData);
    const myValues = Object.values(dailyData);
    console.log(myValues);
    const ctx = document.getElementById("myChart").getContext("2d");
    const chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: myKeys,
            datasets: [
                {
                    label: "Value",
                    backgroundColor: "rgba(247,255,255, .5)",
                    borderColor: "rgb(247,0,255)",
                    fill: true,
                    data: myValues
                }
            ]
        }
    });
}
