
$(document).ready(() => {
    $("#trigger").on("click", () =>{

        var currency = $("#currency").val() //Currency will be a text since I use all currencies in supported-currencies.js
        var number = currencies.filter(object => object.currency == currency) //I filter the object I am interested In
        var totCurrency = "?currency=" + number[0].currency

        var date1 = new Date($("#date1").val()) //I retrieve the dates the user is interested in
        var date2 = new Date($("#date2").val())
        var thedate1 = date1.toISOString().slice(0,10);
        var thedate2 = date2.toISOString().slice(0,10);

        var totalDate = "start="+thedate1+"&end="+thedate2 //I join the two dates with the API link syntax
       
        axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json${totCurrency}&${totalDate}`) //Finished
        .then((result) =>{
            createChart(result) //With the data that I get I make the graphic
        })
        .catch((err) => {
            console.log(err)
        })
    })
    /** 
     * 
     * This get could be like this
     * 
     * get(url, {
     *  params: {
     *     date: totalDate,
     *     currencies: currencies[numberAux].currency...
     * }
     * }) 
     * Get can put the parameters in the link automatically with that object as second argument
     * 
    */
    
})



//chartCode

createChart = (data) => {

    var rawData = data.data.bpi //Extracting the data from data.data.bpi

    var arrayYears = Object.keys(rawData)//Extracting keys 
    var arrayValues = Object.values(rawData) //Extracting years


    var ctx = $('#chart') //Context 2d
    var chart = new Chart(ctx, {
        type: 'line', //Line chart
        data: { 
            labels: arrayYears,//array of years 
            datasets: [{
                labels: 'Bitcoin price', //Label of what it is
                data: arrayValues, //array of values x year
                showLine: true,
                borderColor: 'white',
                borderWidth: 5,
                cubicInterpolationMode: 'monotone',
                pointRadius: 3,
                pointBackgroundColor: '#000000',
                backgroundColor: 'lightgrey',
            }]        
            
        },


    })
}

