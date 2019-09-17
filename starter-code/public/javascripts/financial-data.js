window.onload = function() {
  const promise = getData();
  Promise.resolve(promise).then(values => {
    const data = Object.values(values);
    const labels = Object.keys(values);
    printChart(labels, data);
  });
  document.querySelector("#startDate").onchange = () => {
    const promise = getData();
    Promise.resolve(promise).then(values => {
      const data = Object.values(values);
      const labels = Object.keys(values);
      printChart(labels, data);
    });
  } 
  document.querySelector("#endDate").onchange = () => {
    const promise = getData();
    Promise.resolve(promise).then(values => {
      const data = Object.values(values);
      const labels = Object.keys(values);
      printChart(labels, data);
    });
  } 
};

const getData = () => {
  const bitcoinAPI = new BitcoinAPI(
    "https://api.coindesk.com/v1/bpi/historical/close.json"
  );
  let startDate = document.querySelector("#startDate").value;
  let endDate = document.querySelector("#endDate").value;

  let data = bitcoinAPI.getBitcoinInfo(startDate, endDate).then(res => {
    return res.data.bpi;
  });
  return data;
};

const printChart = (labels, data) => {
  const ctx = document.getElementById("myCanvas").getContext("2d");

  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Bicoin Historical Values",
          backgroundColor: "green",
          data
        }
      ]
    }
  });
};
