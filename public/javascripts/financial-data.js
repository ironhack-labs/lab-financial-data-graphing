const minMaxData = (type, values) => {
  switch (type) {
    case "min":
      return values !== 0 ? Math.floor(Math.min(...values)) : "0";
    case "max":
      return values !== 0 ? Math.floor(Math.max(...values)) : "0";
  }
}

const priceChart = datas => {
  const ctx = document.getElementById("myChart").getContext("2d");
  const stockDates = Object.keys(datas);
  const stockPrices = stockDates.map(price => datas[price]);


  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: stockDates,
      datasets: [
        {
          label: "Bitcoin Price",
          backgroundColor: "rgba(46, 197, 250, 1.0)",
          borderColor: "rgba(36, 141, 178, 1.0)",
          data: stockPrices
        }
      ]
    }
  });

  // Update Min and Max values
  document.getElementById("minPrice").innerHTML = minMaxData("min", stockPrices);
  document.getElementById("maxPrice").innerHTML = minMaxData("max", stockPrices);
};

document.addEventListener(
  "DOMContentLoaded",
  () => {
    const addButton = document.getElementById("buttonSubmit");
    priceChart({"No Date Selected": "0"});

    addButton.addEventListener("click", () => {
      const startDate = document.getElementById("startInput").value;
      const endDate = document.getElementById("endInput").value;
      const currency = document.getElementById("currencyInput").value;
      document.getElementById("currencySelected").innerHTML = currency;
      
      axios
        .get(`/api?startDate=${startDate}&endDate=${endDate}&currency=${currency}`)
        .then(response => {
          priceChart(response.data);
        })
        .catch(err => console.log("Error while getting the data: ", err));
    });
  },
);
