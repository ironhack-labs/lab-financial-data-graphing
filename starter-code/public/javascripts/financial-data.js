const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const from = document.querySelector("#from");
const to = document.querySelector("#to");
const min = document.querySelector("#min");
const max = document.querySelector("#max");

from.addEventListener("input", () => {
  if (from.value < to.value) {
    loadData(from.value, to.value);
  }
});

to.addEventListener("input", () => {
  if (to.value > from.value) {
    loadData(to.value, from.value);
  }
});

function loadData(from, to) {
  let url = `https://api.coindesk.com/v1/bpi/historical/close.json&start?=${from}&end=${to}`;

  axios
    .get(url)
    .then(res => {
      const data = res.data.bpi;
      console.log(Object.keys(data));
      createChart(data);
    })
    .catch(err => console.log(err));
}

function createChart(data) {
  new Chart(ctx, {
    type: "line",
    data: {
      labels: Object.keys(data),
      datasets: [
        {
          label: "Bitcoin",
          data: Object.values(data)
        }
      ]
    }
  });
}
