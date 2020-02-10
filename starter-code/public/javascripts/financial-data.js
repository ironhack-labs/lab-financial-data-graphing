window.onload =  ()=>{
    const inputs = document.querySelectorAll('input')
    const select =     document.querySelector('select')
    

    // let {bpi} =  await  fetch('https://api.coindesk.com/v1/bpi/historical/close.json')
    //                 .then(response => response.json())
    //                 .then(data => data)
    //                 .catch(err => err)

// Array.from(data.bpi).map(el=>el)
const ctx = document.getElementById('myChart').getContext('2d');
let update = async ( ) =>{
            
    let {data} =await axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?${inputs[0].value}&${inputs[1].values}&${select.value}`)
    const {bpi} = data
            const BPIKeys   = Array.from(Object.keys(bpi))
            const BPIValues = Array.from(Object.values(bpi))
            const  myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels:BPIKeys,
                    datasets: [{
                        label: 'BitCoin Price',
                        data: BPIValues,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)'
                        ],
                        borderWidth: 1
                    }]
                }
            });
return myChart
}

Array.from(inputs).forEach((el,i)=>{el.addEventListener('change', function(){
                
    update()
})})


select.addEventListener('change',update)
}



   


     



