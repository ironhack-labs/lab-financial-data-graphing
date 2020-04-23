let fURL = "http://api.coindesk.com/v1/bpi/historical/close.json";

//func for rendering graph
let graphData = (data) => {
  let dataX = [];
  let dataY = [];
  for (date in data.bpi) {
    dataX.push(date);
    dataY.push(data.bpi[date]);
  }
  let ctx = document.getElementById("myChart").getContext("2d");
  let myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: dataX,
      datasets: [
        {
          label: "Price",
          data: dataY,
          borderColor: ["rgba(255, 99, 132, 1)"],
        },
      ],
    },
  });
};

//func for api call
let getStuff = (url) => {
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      graphData(data);
    });
};

//basic load
getStuff(fURL);
console.log("reload");

//user can change dates
document.getElementById("search").onclick = (event) => {
  event.preventDefault();
  let startdate = document.getElementById("startdate").value;
  let enddate = document.getElementById("enddate").value;
  console.log(startdate);
  console.log(enddate);
  getStuff(
    `http://api.coindesk.com/v1/bpi/historical/close.json?start=${startdate}&end=${enddate}`
  );
};
