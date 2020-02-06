axios
  .get("http://api.coindesk.com/v1/bpi/historical/close.json")
  .then(response => {
    const dataBitcoin = response.data.bpi;
    console.log(dataBitcoin);
    const ctx = document.getElementById("myChart").getContext("2d");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: Object.keys(dataBitcoin),
        datasets: [
          {
            label: "Bitcoin Price Index",
            data: Object.values(dataBitcoin)
          }
        ]
      }
    });
  });

const input = document.getElementsByTagName("input");
const selectDate = () => {
  const firstDate = document.getElementById("first-date");
  const secondDate = document.getElementById("second-date");
  if (firstDate.value !== undefined && secondDate.value !== undefined) {
    axios
      .get(
        `http://api.coindesk.com/v1/bpi/historical/close.json?start=${firstDate.value}&end=${secondDate.value}`
      )
      .then(response => {
        const dataBitcoin = response.data.bpi;
        console.log(dataBitcoin);
        const ctx = document.getElementById("myChart").getContext("2d");
        new Chart(ctx, {
          type: "line",
          data: {
            labels: Object.keys(dataBitcoin),
            datasets: [
              {
                label: "Bitcoin Price Index",
                data: Object.values(dataBitcoin)
              }
            ]
          }
        });
      });
  }
};
