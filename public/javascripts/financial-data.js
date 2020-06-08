function getDataFromApi(apiUrl) {
  axios
    .get(apiUrl)
    .then((response) => {
      console.log("response", response.data.bpi);
      drawLineChart(
        Object.keys(response.data.bpi),
        Object.values(response.data.bpi)
      );
      displayInformation(Object.values(response.data.bpi));
    })
    .catch((err) => {
      console.log(err);
    });
}

document.querySelectorAll("input").forEach((input) => {
  input.addEventListener("change", () => {
    const fromDate = document.getElementById("from").value;
    const toDate = document.getElementById("to").value;
    getDataFromApi(
      `http://api.coindesk.com/v1/bpi/historical/close.json?start=${fromDate}&end=${toDate}`
    );
  });
});

document.getElementById("currency").addEventListener("change", () => {
  var currency = document.getElementById("currency").value;

  if (document.getElementById("from").value !== "") {
    const fromDate = document.getElementById("from").value;
    const toDate = document.getElementById("to").value;
    getDataFromApi(
      `http://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}&start=${fromDate}&end=${toDate}`
    );
  } else {
    getDataFromApi(
      `http://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}`
    );
  }
});

function drawLineChart(labels, data) {
  var ctx = document.getElementById("myChart");
  var myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "# Bitcoin Price Index",
          data: data,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          fill: false,
          borderColor: "rgb(53,53,130)",
          lineTension: 0,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              suggestedMin: 9000,
            },
          },
        ],
      },
    },
  });
}

function displayInformation(priceArr) {
  let infoContainer = document.getElementById("info-box");

  const currency = document.getElementById("currency").value.toUpperCase();

  infoContainer.innerHTML = `<p id="max"><span>Max:</span>${Math.max(
    ...priceArr
  )} ${currency}</p>
                             <p id="min"><span>Min:</span>${Math.min(
                               ...priceArr
                             )} ${currency}</p>`;
}

getDataFromApi("http://api.coindesk.com/v1/bpi/historical/close.json");
