function getData() {
  axios
    .get(
      `http://api.coindesk.com/v1/bpi/historical/close.json?start=${setDate1()}&end=${setDate2()}&currency=${setCurrency()}`
    )
    .then(response => {
      console.log(response.data.bpi);
      let ctx = document.getElementById("myChart");
      let myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: Object.keys(response.data.bpi),
          datasets: [
            {
              label: "# of Votes",
              data: Object.values(response.data.bpi),
              backgroundColor: ["rgba(0,0,255,0.3)"],
              borderColor: ["green"],
              borderWidth: 1
            }
          ]
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: Math.min(Object.values(response.data.bpi))
                }
              }
            ]
          }
        }
      });
    })

    .catch(err => console.log(err));
}

const button = document.getElementById("get-data");
button.addEventListener("click", getData);

const firstDate = document.getElementById("first-date");
firstDate.addEventListener("change", setDate1);

const lastDate = document.getElementById("last-date");
lastDate.addEventListener("change", setDate2);

const currency = document.getElementById("currency");
currency.addEventListener("change", setCurrency);

function setDate1() {
  let date1 = firstDate.value;
  if (date1 === "") return "2019-01-01";
  return date1;
}

function setDate2() {
  let date2 = lastDate.value;
  if (date2 === "") return "2019-01-20";
  return date2;
}

function setCurrency() {
  let cur = currency.value;
  return cur;
}
