const URL = "http://api.coindesk.com/v1/bpi/historical/close.json";

axios.get(URL)
.then((data)=>
{console.log(data);})
.catch((err)=>{
    console.log(err);
    next(err);
})