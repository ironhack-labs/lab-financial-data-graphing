
      var fromDate = document.querySelector('#fromDate')
      var toDate = document.querySelector('#toDate')
      var currency = 'USD';
      fromDate.addEventListener('change', function(){
        fromDate.value = this.value;
        
      })
    const apiUrl = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${fromDate.value}&end=${toDate.value}&currency=${currency}`
      axios
      axios.get(apiUrl)
      .then(responseFromAPI => {
        var data = responseFromAPI.data
      })
      .catch(err => console.log('Error while getting the data: ', err));

