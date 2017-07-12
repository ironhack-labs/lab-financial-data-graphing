function getPokemonInfo(id) {
  $.ajax({
    url: "http://api.coindesk.com/v1/bpi/historical/close.json",
    method: "GET",
    success: function (response) {
      console.log(response);
    },
    error: function (err) {
      console.log(err);
    },
  });
}


// $("#pokeButton").on('click', function(){
//   getPokemonInfo(1);
// });
