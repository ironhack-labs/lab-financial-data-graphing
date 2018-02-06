
function main() {
  
  const coinApi = axios.create({
    baseURL: 'http://api.coindesk.com/v1/bpi/historical/close.json'
  })

  function getCoinInfo(id) {
    coinApi.get(id)
      .then(response => {
        console.log(response.price)
      })
      .catch(err => {
        console.log(err);
      })
  }

  const coinBtn = document.createElement('button');
  coinBtn.setAttribute('id', 'coin-btn');
  coinBtn.innerText = 'Get Coin Prices';
  const div = document.createElement('div');

  div.appendChild(coinBtn);
  document.getElementById('main').appendChild(div);

  document.getElementById("coin-btn").onclick = function (){
    getCoinInfo('')
  };
}

window.onload = main();