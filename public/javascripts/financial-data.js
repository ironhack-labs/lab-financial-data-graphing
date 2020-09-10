let [month,day,year] = (new Date()).toLocaleDateString().split("/");

let fromDate = (new Date(year - 1, month - 1, day - 1)).toISOString().slice(0,10);
let toDate = (new Date(year,month - 1, day - 1)).toISOString().slice(0,10);
let currency = 'EUR';

document.querySelector('#start-date').value = fromDate;
document.querySelector('#end-date').value = toDate;

const updateChart = (fromDate, toDate) => {
  const apiUrl = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${fromDate}&end=${toDate}&currency=${currency}`;
  
  axios
  .get(apiUrl)
  .then(res => {
    const bpiData = res.data.bpi;
    let filtered = null;
    if(Object.keys(bpiData).length>365*5){
      filtered = Object.keys(bpiData)
        .filter(key => {
          return (new Date(Date.parse(key)).getMonth()) % 6 === 0 && (new Date(Date.parse(key)).getDate()) === 1;
        })
        .map(key=> [key, bpiData[key]]);
    } else if(Object.keys(bpiData).length>365*3){
      filtered = Object.keys(bpiData)
        .filter(key => {
          return (new Date(Date.parse(key)).getMonth()) % 3 == 1 && (new Date(Date.parse(key)).getDate()) === 1;
        })
        .map(key=> [key, bpiData[key]]);
    } else if(Object.keys(bpiData).length>365){
      filtered = Object.keys(bpiData)
        .filter(key => {
          return (new Date(Date.parse(key)).getDate()) === 1;
        })
        .map(key=> [key, bpiData[key]]);
    } else {
      filtered = Object.keys(bpiData)
        .filter(key => {
          return true;
        })
        .map(key=> [key, bpiData[key]]);
    }

    const xAxis = filtered.map(key=>key[0]);
    const yAxis = filtered.map(key=>key[1]); 
  
    const chart = document.getElementById('chartBPI');
    new Chart(chart, {
      type: 'line',
      data: {
        labels: xAxis,
        datasets: [
          {
            label: 'Bitcoin Price',
            borderColor: 'teal',
            data: yAxis
          }
        ]
      },
      options: {
        // This chart will not respond to mousemove, etc
        events: ['click']
      }

    });
  })
  .catch(err=>console.log(err));
};

handleChange = (e) => {
  e.preventDefault();

  let inpStartDate = document.querySelector('#start-date');
  let inpEndDate = document.querySelector('#end-date');
  
  if(Date.parse(inpEndDate.value) >= Date.parse(new Date())) inpEndDate.value = new Date().toISOString().slice(0,10);
  if(Date.parse(inpStartDate.value) >= Date.parse(inpEndDate.value)) inpStartDate.value = inpEndDate.value;
  if(Date.parse(inpStartDate.value) <= Date.parse("2010-07-17")) inpStartDate.value = "2010-07-17";
  if(Date.parse(inpEndDate.value) <= Date.parse(inpStartDate.value)) inpEndDate.value = inpStartDate.value;

  updateChart(inpStartDate.value, inpEndDate.value);
};

document.querySelector('#start-date').addEventListener('change',handleChange);
document.querySelector('#end-date').addEventListener('change',handleChange);

updateChart(fromDate,toDate);