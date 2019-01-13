// Get the data and split axes : x and y
const getData = (startDate, endDate) => {
    axios
      .get("http://api.coindesk.com/v1/bpi/historical/close.json", {
        params: {
          start: startDate,
          end: endDate
        }
      })
      .then(function(response) {
        printTheChart(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  
  // Récupérer start date et end Date par défaut :
  const startDate = $("input.startDate").val();
  console.log("start : " + startDate);
  const endDate = $("input.endDate").val();
  console.log("end : " + endDate);
  
  function update() {
      const startDate = document. getElementById("startDate").value;
      const endDate = document. getElementById("endDate").value;
      getData(startDate, endDate);
    }
  
  // Sans J QUERY (avec id à la place de classe : # à la place de .) pour ne pas utiliser 
  // const startDate = document. getElementById("startDate").value;
  
  
  // Modification de la start date, avec conservation de la end date :
  //$(".startDate").change(update);
  $(".startDate").change(update);
  
  $(".endDate").change(update);
  
  getData(startDate, endDate);
  
  
  
  // document. getElementById("startDate").onchange = (e => {
  //   const startDate = e.target.value;
  //   const endDate = $("input.endDate").val();
  //   console.log("start : " + startDate);
  //   getData(startDate, endDate);
  // });
  
  // Construire le graphe
  const printTheChart = stockData => {
    const bpiDates = Object.keys(stockData.bpi);
    const bpiValues = Object.values(stockData.bpi);
  
    const ctx = document.getElementById("myChart").getContext("2d");
  
    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: bpiDates,
        datasets: [
          {
            label: "Bitcoin Price Index",
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgb(255, 99, 132)",
            data: bpiValues
          }
        ]
      }
    });
  };
  