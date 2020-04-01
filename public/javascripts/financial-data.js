axios.get('http://api.coindesk.com/v1/bpi/historical/close.json')
    .then( bpi => {
        let data = bpi.data.bpi;
        let dates = Object.keys(data);
        let prices = Object.values(data);
       
        let container = document.querySelector('.container');

        dates.map( date => {
            let li = document.createElement('li');
            li.innerHTML = date;

            container.appendChild(li);
        })
        
        
    })
    .catch(error => {
        console.log(error);
    });