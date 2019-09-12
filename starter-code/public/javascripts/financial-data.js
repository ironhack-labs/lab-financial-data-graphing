const drawCharts=(labels,values,start,end)=>{




    const ctx = document.getElementById("myChart").getContext("2d");
    new Chart(ctx, {
      type:"line",
      data: {
        labels:labels,
        datasets:[{
          backgroundColor:"rgb(255,99,132,0.2)",
          label:"Bitcoin money bro",
          data:values
        }
      ]
      }
    })
    
    }
    const firsDate="2019-09-01";
    const secondDate="2019-09-13";

    function changeData(max,min, currency){
        document.getElementById("max").innerText="Max value: " +max +" "+ currency;
        document.getElementById("min").innerText="Min value: " + min +" "  + currency;

    }


    getData(firsDate,secondDate,"USD");
    function getData(start,end,currency){axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}&currency=${currency}`)
    .then(response=>{
        console.log(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}`)
        let dates= response.data.bpi;
        let keys= Object.keys(dates);
        let values=Object.values(dates);
        let maxValue=values.sort(function(a, b){return b-a})[0]
        let minValue=values.sort(function(a, b){return a-b})[0]
        console.log(maxValue, minValue);
      console.log(keys,values)

      changeData(maxValue, minValue, currency);
      
      drawCharts(keys,values);
        
    
      
    
     
    
    })}
    ;
    const start=document.getElementById("start");
    const end=document.getElementById("end");
    const currency=document.getElementById("currency");

  start.onchange=()=>{
      console.log(start.value);
    getData(start.value,end.value,currency.value);
        
        }   
        
   end.onchange=()=>{
        console.log(end.value);
        getData(start.value,end.value,currency.value);
              
    } 
    currency.onchange=()=>{
        console.log(currency.value)
        getData(start.value,end.value,currency.value);
    }

  