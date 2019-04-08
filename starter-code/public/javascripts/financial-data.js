const base_url = "http://api.coindesk.com/v1/bpi/historical/close.json";
const ctx = document.getElementById("chart").getContext("2d");
const maxValue = document.getElementsByClassName("max-value");
const minValue = document.getElementsByClassName("min-value");
const ini = document.getElementsByClassName("initiald")
const fi = document.getElementsByClassName("finald")

document.getElementById("btn").addEventListener("click", () =>{
    ini.amount;
    fi.amount;
    const dates = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${ini}&end=${fi}&currency=${currencies}`
  
     axios.get(dates).then(result => {
      setCharacter(result)
    })
    .catch(err => console.log(err))
  });

function setCharacter(event){
    const amount = Object.values(event.data.bpi)
    const date = Object.keys(event.data.bpi)
    maxValue.innerHTML = Math.max(...amount);
    minValue.innerHTML = Math.min(...amount);

    const chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: date,
          datasets: [
            {
              label: "Bitcoin Price Index",
              backgroundColor: "rgb(255, 99, 132)",
              borderColor: "rgb(255, 99, 132)",
              data: amount,
            }
          ]
        }
      });
};

axios.get(base_url).then(result => {
  setCharacter(result)
})
.catch(err => console.log(err))

 

  