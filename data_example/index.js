window.onload = () => {
  let firstDate = document.getElementById("First").value;
  let secondDay = document.getElementById("Second").value;

  document.getElementById("update").addEventListener("click", () => {
    firstDate = document.getElementById("First").value;
    secondDay = document.getElementById("Second").value;
    console.log(firstDate);
    console.log(secondDay);
    start();
  });

  const start = () => {
    const api_url = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${firstDate}&end=${secondDay}`;

    axios.get(api_url).then(res => {
      var x = res.data.bpi;
      let values = Object.values(x);
      console.log(values);
      let dia = Object.keys(x);
      console.log(dia);

      let ctx = document.getElementById("myChart").getContext("2d");
      let chart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: dia,
          datasets: [
            {
              label: "Bitcoin value",
              backgroundColor: "rgb(255, 99, 132)",
              borderColor: "rgb(255, 99, 132)",
              data: values
            }
          ]
        }
      });
    });
  };
  start();
};
