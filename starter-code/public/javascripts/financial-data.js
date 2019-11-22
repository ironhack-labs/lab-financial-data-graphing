const today = new Date();
const jan1st = new Date(today.getFullYear(), 0);
const todayAsText = today.toJSON().substr(0, 10);
const jan1stAsText = jan1st.toJSON().substr(0, 10);

async function getData() {
  const start = document.getElementById("from").value || jan1stAsText;
  const end = document.getElementById("to").value || todayAsText;
  const currency = document.getElementById("currency").value || "USD";
  const response = await fetch(
    `https://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}&currency=${currency}`
  );
  const { bpi } = await response.json();
  let min = 999999999999999999;
  let max = 0;
  Object.values(bpi).forEach(price => {
    min = Math.min(price, min);
    max = Math.max(price, max);
  });
  document.getElementById("min").innerHTML = `${min} ${currency}`;
  document.getElementById("max").innerHTML = `${max} ${currency}`;

  const ctx = document.getElementById("graph").getContext("2d");
  const data = {
    datasets: [
      {
        data: Object.entries(bpi).map(([x, y]) => ({ x: new Date(x), y })),
        label: "Bitcoin Price Index"
      }
    ]
  };
  const graph = new Chart(ctx, {
    type: "line",
    data: data,
    options: {
      scales: {
        xAxes: [
          {
            type: "time",
            time: {
              unit: "day"
            }
          }
        ]
      }
    }
  });
}

document.getElementById("from").onchange = getData;
document.getElementById("to").onchange = getData;
document.getElementById("currency").onchange = getData;

getData();
