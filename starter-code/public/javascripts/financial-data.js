
document.querySelector("#graph").addEventListener("submit", graphRequest);

function graphRequest(e){
  e.preventDefault();
axios.get('http://api.coindesk.com/v1/bpi/historical/close.json')
.then(function(response){
  console.log(response.data);
  const keys = Object.keys(response.data.bpi)
  const values = Object.values(response.data.bpi)

  var ctx = document.getElementById("myChart").getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: keys,
        datasets: [
            {
                data: values,
                label: "Bitcoin values",
                borderColor: "#c45850",
                fill: false
            }
        ]
    },
    options: {
        title: {
            display: true,
            text: 'Bitcoin live values'
        }
    } 
  }) 
})
.catch(function(err){
  console.log(err)
})
}

var inputStart = document.getElementById('start')
var inputEnd = document.getElementById('end')

inputStart.addEventListener('change', endChange())
 function endChange(){
    inputEnd.addEventListener('change', function(){
        let start = inputStart.value
        let end = inputEnd.value
        axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}`)
        .then(response => {
            const keys = Object.keys(response.data.bpi)
            const values = Object.values(response.data.bpi)

            var ctx = document.getElementById("myChart").getContext('2d');
            var myChart = new Chart(ctx, {
              type: 'line',
              data: {
                  labels: keys,
                  datasets: [
                      {
                          data: values,
                          label: "Bitcoin values",
                          borderColor: "#c45850",
                          fill: false
                      }
                  ]
              },
              options: {
                  title: {
                      display: true,
                      text: 'Bitcoin live values'
                  }
              } 
            }) 
          })
          .catch(function(err){
            console.log(err)
          })
        })
      }