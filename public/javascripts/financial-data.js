const createChart = async (options) => {
  const url = `http://api.coindesk.com/v1/bpi/historical/close.json` +
    (options ? `?start=${options[0]}&end=${options[1]}` : "");

  try {
    const response = await axios.get(url);
    console.log(response.data);

    const bpiDates = Object.keys(response.data.bpi);
    const bpiPrices = Object.values(response.data.bpi).map(
      (val) => Math.round(val) / 1000
    );

    const ctx = document.getElementById("myChart").getContext("2d");

    new Chart(ctx, {
      type: "line",
      data: {
        labels: bpiDates,
        datasets: [
          {
            label: "Stock price",
            backgroundColor: "rgb(224, 224, 210)",
            borderColor: "rgb(171, 171, 135)",
            data: bpiPrices,
          },
        ],
      },
    });
  } catch (error) {
    console.log(error);
  }
};

window.onload = () => {
  createChart();

  const datesButton = document.getElementById("get-dates-btn");

  datesButton.addEventListener("click", () => {
    let start = document.getElementById("starter-date").value;
    let end = document.getElementById("end-date").value;
    
    if (!start || !end) return window.alert('Both start and end must be filled.')

    createChart([start, end]);
  })
};
