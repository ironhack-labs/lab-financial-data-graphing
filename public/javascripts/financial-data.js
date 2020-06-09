

const data = `http://api.coindesk.com/v1/bpi/historical/close.json`;

function graph (){

axios.get(data)
    .then((dataApi) =>{
      //  console.log(dataApi);
    var databpi = dataApi.data.bpi;
    var dateList= Object.keys(databpi)
    var bpiList = Object.values(databpi)

//console.log(dateList);
//console.log(valueList);

    startDate = document.querySelector("#start").value;
    endDate= document.querySelector("#end").value;
    dateArray = dateList.slice(dateList.indexOf(startDate),dateList.indexOf(endDate));
    bpiArray = bpiList.slice(dateList.indexOf(startDate),dateList.indexOf(endDate));
    console.log(dateArray);
    console.log(bpiList);

const ctx = document.getElementById("myChart").getContext("2d");
  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: dateArray,
      datasets: [
        {
          label: "Stock Chart",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: bpiArray
        }
      ]
    }
  }
  
  
  );


    }
    
    )}