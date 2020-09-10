const apiUrl = "http://api.coindesk.com/v1/bpi/historical/close.json";

const printTheChart = (bitData) => {
  const dailyData = bitData.bpi;
  console.log({ dailyData });

  const dataDates = Object.keys(dailyData);
  //   console.log({dataDates});
  const bitPrices = Object.values(dailyData);
  //   console.log("these are the dates and prices", bitPrices, dataDates);

  const ctx = document.getElementById("myChart").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: dataDates,
      datasets: [
        {
          label: "Bitcoin Price Index",
          backgroundColor: "rgba(255, 99, 10, 0.2)",
          borderColor: "rgb(100, 75, 50)",
          data: bitPrices,
        },
      ],
    },
  });
};

const inputFrom = document.querySelector("#from");
const inputTo = document.querySelector("#to");
const dateInputFrom = inputFrom.value;
const dateInputTo = inputTo.value;
const currency = document.querySelector("#currency")
const changeCurrency = currency.value

inputFrom.addEventListener("change", () => {
    const dateInputFrom = inputFrom.value;
    const dateInputTo = inputTo.value;
    axiosGet(dateInputFrom, dateInputTo);
});

inputTo.addEventListener("change", () => {
    const dateInputFrom = inputFrom.value;
    const dateInputTo = inputTo.value;
    axiosGet(dateInputFrom, dateInputTo);
});

currency.addEventListener("change", () => {
    const changeCurrency = currency.value;
    axiosGet(changeCurrency);
})

const axiosGet = (dateInputFrom, dateInputTo, changeCurrency) => {
  let apiUrlDates =
    dateInputFrom && dateInputTo
      ? apiUrl + `?start=${dateInputFrom}&end=${dateInputTo}`
      : apiUrl ;
      console.log(apiUrlDates);
  
let apiUrlCurrency = 
  changeCurrency ? 
  apiUrl + `?currency=${changeCurrency}`
  : apiUrl ;
  console.log(apiUrlCurrency); 
  axios
    .get(apiUrlDates)
    .then((response) => {
    //   console.log("this is first", Object.values(response.data.bpi));
      printTheChart(response.data);
    })
    .catch((error) => {
      console.log("Error while getting the data", error);
    });
};

axiosGet(dateInputFrom, dateInputTo, changeCurrency);
