
// document.getElementById('date-to').value = new Date().toDateInputValue();
// let newDate = new Date();

// let dateTo = document.getElementById('date-to').valueAsDate = new Date();
// let dateFrom = document.getElementById('date-from').valueAsDate = new Date();

// let dateFrom = document.getElementById('date-from').valueAsDate = newDate;
// document.getElementById('date-from').valueAsDate = newDate.setMonth(newDate.getMonth() - 1);


const bitInfo = axios.create({
  baseURL: 'http://api.coindesk.com/v1/bpi/historical'
});


let dateTo = document.getElementById("date-to");
let dateFrom = document.getElementById("date-from");

const datesDefined = () => {
  dateTo = document.getElementById("date-to").getAttribute('value');
  dateFrom = document.getElementById("date-from").getAttribute('value');
  
  bitInfo.get(`close.json?start=${dateFrom}&end=${dateTo}`)
  .then(response => {
    const values = [];
    const dates = [];
    console.log(response.data.bpi);
    for (let key in response.data.bpi) {
      values.push(response.data.bpi[key]);
      dates.push(key);
    }

    myChart(dates, values);
  })
  .catch(error => {
    console.log(error);
  });

};

dateTo.addEventListener("change", datesDefined);

var ctx = document.getElementById("myChart").getContext("2d");
const myChart = (dates, values) => {
  new Chart(ctx, {
    type: "line",
    data: {
      labels: dates,
      datasets: [
        {
          label: "# of Votes",
          data: values,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  });
};

bitInfo
  .get('close.json')
  .then(response => {
    const values = [];
    const dates = [];
    console.log(response.data.bpi);
    for (let key in response.data.bpi) {
      values.push(response.data.bpi[key]);
      dates.push(key);
    }
    console.log(values);
    console.log(dates);
    myChart(dates, values);
  })
  .catch(error => {
    console.log(error);
  });
