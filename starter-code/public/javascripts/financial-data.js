const stockInfo = () =>
  axios
    .get(`https://api.coindesk.com/v1/bpi/historical/close.json`)
    .then(res => {

      let objData = res.data.bpi;
      let datesBtc = Object.keys(objData); // para obtener las claves de un obj en un array para luego recorrerlo
      let priceBtc = Object.values(res.data.bpi); //para obtener las valores de un obj en un array para luego recorrerlo
      console.log(priceBtc);
      console.log(datesBtc);
    
      printTheChart(datesBtc, priceBtc);
    });
    
    let printTheChart = (datesBtc, priceBtc) => {
        
        let ctx = document.getElementById("myChart").getContext("2d");
        let chart = new Chart(ctx, {
            type: "line",
            data: {
                labels: datesBtc,
                datasets: [
                    {
                        label: "Stock Chart",
                        backgroundColor: "rgb(255, 99, 132)",
                        borderColor: "rgb(255, 99, 132)",
                        data: priceBtc
                    }
                ]
            }
        });
    };
    
    stockInfo();