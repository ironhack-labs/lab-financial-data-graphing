const canvas=document.querySelector("#dataCanvas")
const ctx = canvas.getContext('2d')

  axios.get(('http://api.coindesk.com/v1/bpi/historical/close.json'))
  .then(({data})=>{
    const arr = Object.values(data.bpi)
    console.log(arr)
  }).catch(err=>console.log(err))