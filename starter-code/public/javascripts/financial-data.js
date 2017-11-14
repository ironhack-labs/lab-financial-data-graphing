$( document ).ready(function() {

  axios({
   method:'get',
   url:'http://api.coindesk.com/v1/bpi/historical/close.json',
   responseType:'json'
  }).then(function(response) {
     //console.log(response);
     let data= response.data.bpi;
     console.log(data);
   //response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'));
  });








// end of $ document
});
