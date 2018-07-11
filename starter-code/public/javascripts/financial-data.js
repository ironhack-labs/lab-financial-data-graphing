window.onload = function() {
  axios
    .get("http://api.coindesk.com/v1/bpi/historical/close.json")
    .then(res => {
    //   console.log(res.data.bpi);

      drawChart(res.data.bpi);
    });

  const startDate = document.getElementById("startDate");
  const endDate = document.getElementById("endDate");
  const currencyFilter = document.getElementById("currency");

  startDate.onchange = () => {
    getDataByDateRange();
  };
  endDate.onchange = () => {
    getDataByDateRange();
  };
  currencyFilter.onchange = () => {
    getDataByDateRange();
  };

  const getDataByDateRange = () => {
    let date_ini = startDate.value;
    let date_end = endDate.value;
    let currency = currencyFilter.value;

    let url = `http://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}`;

    if (date_ini && date_end && compareDates(date_ini, date_end)) {
        url += `&start=${date_ini}&end=${date_end}`;
    }

    axios
        .get(url)
        .then(res => {
            // console.log(res.data.bpi);

            drawChart(res.data.bpi);
        });
  };

  const drawChart = data => {
    let ctx = document.getElementById("Mychart").getContext("2d");

    let labels = Object.keys(data);
    let values = Object.values(data);
    let max = Math.max.apply(null, values);
    let min = Math.min.apply(null, values);
    minMax(max,min);
    let chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
              label: "Bitcoin Price Index",
                data: values
          }
        ]
      }
    });
  };

  const compareDates = (fromDate, toDate) => {
    return new Date(fromDate) < new Date(toDate);
  };

  const minMax = (max,min) => {
    document.getElementById("maxvalues").innerHTML = `${max} ${currencyFilter.value}`;
    document.getElementById("minvalues").innerHTML = `${min} ${currencyFilter.value}`;

  }
};
