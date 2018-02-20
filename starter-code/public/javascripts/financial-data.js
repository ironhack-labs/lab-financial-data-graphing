
 
 const btcApi = axios.create ({
     baseURL:'http://api.coindesk.com/v1/bpi/historical/close.json'
 })
var btcdate;

        function getBitCoinDatas() {
            btcApi.get()
            .then(response => {
                     //btcdate= Object.keys(response.data.bpi);
                    btcdate= this.Object.values(response.data.bpi);
                   //console.log(btcprice);
                   console.log('hola');
                    return btcdate;
                  
               
            })
            .catch(err => {
                console.error(err)
            })
            
            }



            function dataChart(){
                getBitCoinDatas();
                console.log( getBitCoinDatas())
            }
         
            
            document.getElementById("BTC").onclick= dataChart;

            
            
          