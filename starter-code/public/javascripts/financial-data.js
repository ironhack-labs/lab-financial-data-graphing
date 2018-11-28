document.addEventListener(
  "DOMContentLoaded",
  ()=>{
  axios.get("http://api.coindesk.com/v1/bpi/historical/close.json")
  .then(result=>{
    console.log(result)
  })
  //.catch(e=>console.log(e))
},false)

