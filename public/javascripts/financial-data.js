const getData = () => {
    axios
        .get(`http://api.coindesk.com/v1/bpi/historical/close.json`)
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          next(error)
        });
}

getData()