$(function() { //equivale a document.ready
  $("#getButton").on('click', function() {
    console.log('Calling API..')
    getInfo(1);
    console.log('Response..')
    //con promesa
    /*    getPokemonInfo(1).then(function(response){
          console.log(response)
        })
    */
  })
});

function getInfo() {
  $.ajax({
    url: "http://api.coindesk.com/v1/bpi/historical/close.json",
    method: "GET",
    success: function(response) {
      //The callback function that will be executed if the request is completed succesfully
    //This function will have a parameter with the server response.
      console.log(response);
    },
    error: function(err) {
      //The callback function that will be executed if the request fails, whether it was a client or a server error
    //It will have a parameter with error that caused the request to fail
      console.log(err);
    },
  })
}
//con promesa
/*
function getPokemonPromesaInfo(id) {
return  $.ajax({
    url: "http://pokeapi.co/api/v2/pokemon/" + id,
    method: "GET",

  }).promise();
}
*/

//explicación promesas--->
/*ejemplo promesas y asinc
asyncFuncion(function(error,result){
  if  (error) return 'error'
  otherAsync(function(error,result2){
    anotherAsync(function(){
      console.log('done')
    })
  })
})

asyncFuncion().then(function(){
return otherAsync();
}).then(function(){
return anotherAsync();
}).then(function(){
  console.log('done')
}).catch(function(error){
    console.log('error')
});
*/
