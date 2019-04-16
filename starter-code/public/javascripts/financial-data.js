let money = document.querySelector("#coinType");
let coin;

document.getElementById("coinType").onchange = function(e) {
  coin = e.value;
};

var date;
document.getElementById("applyDates").onchange = function(e) {
  date = e.value;
  draw();
};

let start = document.querySelector("#dateStart");
let end = document.querySelector("#dateEnd");

document.querySelector("#applyDates").onclick = function() {
  draw();
};


function draw() {
  axios
    .get(
      `http://api.coindesk.com/v1/bpi/historical/close.json?currency=${money.value}&start=${start.value}&end=${end.value}`
    )
    .then(bitCoinData => {
      bitCoinData = bitCoinData.data;
      const X1 = Object.keys(bitCoinData.bpi);
      const Y1 = Object.values(bitCoinData.bpi);
      const max = arr => Math.max(...arr);
      let priceMax = max(Y1);
      document.getElementById("max").innerHTML = `${priceMax} ${money.value}`;
      const min = arr => Math.min(...arr);
      let priceMin = min(Y1);
      document.getElementById("min").innerHTML = `${priceMin} ${money.value}`;
      const ctx = document.getElementById("bitcointchart").getContext("2d");
      const chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: X1,
          datasets: [
            {
              label: "Stock Chart",
              borderWidth: 3,
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgb(255, 99, 132, 0.5)",
              data: Y1
            }
          ]
        }
      });
    })
    .catch(error => {
      console.log(error);
    });
}


