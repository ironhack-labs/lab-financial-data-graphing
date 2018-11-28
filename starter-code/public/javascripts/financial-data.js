document.addEventListener(
    "DOMContentLoaded",
    () => {
        axios.get('http://api.coindesk.com/v1/bpi/historical/close.json')
            .then(data => {
                console.log(data.data.time.updated)
            })
    },
    false
);