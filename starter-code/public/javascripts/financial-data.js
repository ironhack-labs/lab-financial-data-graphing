var update = ()=>{
    let start = $('#start').val();
    let end = $('#end').val();
    let value = $('#value').val();

axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}&currency=${value}`).then(response => {
    let ctx = document.getElementById("myChart").getContext("2d");
    let datas = response.data.bpi;
    let min = Math.min.apply(null, Object.values(datas));
    let max = Math.max.apply(null, Object.values(datas));
    let myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: Object.keys(datas),
        datasets: [{label: "Bitcoins ฿",data: Object.values(datas)}]},});
      $('#min').empty().append(min, value);
      $('#max').empty().append(max, value);
    })
  .catch(err => {
    console.error(err);
  });
}

$(document).ready(update);
$('#start').change(update);
$('#end').change(update);
$('#value').change(update);