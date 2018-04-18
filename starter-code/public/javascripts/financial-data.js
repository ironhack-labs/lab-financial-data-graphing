
let btn = document.getElementById("btn");
let boolean = true;
let api_url_coin = "http://api.coindesk.com/v1/bpi/historical/close.json?start=2017-01-01&end=2017-02-02&currency=EUR";

const draw = () => {
  
  let coin = document.getElementById("coins").value;
  let start = document.getElementById("date-start").value;
  let end = document.getElementById("date-end").value;
  console.log(coin);
  let api_url = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}&currency=${coin}`;
  axios.get(api_url)
  .then(res => {
    console.log(res.data.bpi);
    const dat = Object.keys(res.data.bpi)
    const val = Object.values(res.data.bpi)
    drawChart(dat, val);
    document.getElementById("min").innerHTML = ` Min ${Math.min.apply(Math, val)} ${coin}`;
    document.getElementById("max").innerHTML = `Max ${Math.max.apply(Math, val)} ${coin}`;

  })
  
  const drawChart = (dat, val) => {
    let ctx = document.getElementById("myChart").getContext("2d");
    let chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: dat,
        datasets: [
          {
            label: "Stock Chart",
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgb(255, 99, 132)",
            data: val
          }
        ]
      }
    });
  }



}


btn.addEventListener("click", () => {
  let start = document.getElementById("date-start").value;
  let end = document.getElementById("date-end").value;
  let coin = document.getElementById("coins").value;
  console.log(coin);
  console.log(start, end)
  boolean = false;
  draw();
});

if (boolean) draw();

console.log("end")