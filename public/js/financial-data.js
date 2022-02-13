const baseURL = "http://localhost:3000";

async function getData() {
    try {
        const fromDate = document.getElementById("fromDate").value;
        const toDate = document.getElementById("toDate").value;
        const currency = document.getElementById("currency").value;
        const response = await axios.get(`${baseURL}/getData?start=${fromDate}&end=${toDate}&currency=${currency}`);
        console.log("response.data from expressApp: ", response);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

function renderData(apiData){
    const ctx = document.getElementById('myChart').getContext('2d');
    const labels = [];
    for (let i in apiData) {
    labels.push(i);
    }
    apiValues = [];
    for (let j in apiData) {
        apiValues.push(apiData[`${j}`])
    }
    const data = {
        labels: labels,
        datasets: [{
          label: 'Nico dataset',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: apiValues,
        }]
      };
      const config = {
        type: 'line',
        data: data,
        options: {}
      };
        console.log("data: ", data);

      const myChart = new Chart(
        ctx,
        config
      );
    return;
}

async function getAndRenderData(){
    const data = await getData();
    renderData(data);
    return;
}

const button = document.querySelector("button");
button.addEventListener("click", getAndRenderData);



  