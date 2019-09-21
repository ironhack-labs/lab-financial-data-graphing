
function fillData(data){

    var labels=[];
    var newdata=[]
   
    for (var k in data.bpi) {
        if (data.bpi.hasOwnProperty(k)) {
          labels.push(k);
          newdata.push(data.bpi[k]);
        }
    }

//https://forum.jsreport.net/topic/337/chartjs-mime-type-error/2
//if not used correct version you get mime type not executable error

var ctx = document.getElementById('myChart').getContext('2d');


    var mixedChart = new Chart(ctx, {
        type: 'bar',
        data: {
            datasets: [{
                label: 'Bicoin price index',
                data: newdata,
                type: 'line'
            }],
            labels: labels
        },
        options:{}
    });


}







$(document).ready( () => {
	
  let api=new APIHandler('http://api.coindesk.com/v1/bpi/historical/close.json');	


  
  $('#start').change(function(){
      let start=$('#start').val();
      let end=$('#end').val()
      if (start.length>0 && end.length>0)
	   api.getData({params:{start:start,end:end}});
	  

 });

  
 $('#end').change(function(){
    let start=$('#start').val();
    let end=$('#end').val() 
    if (start.length>0 && end.length>0)
    api.getData({params:{start:start,end:end}});
	  
    

});
  
  
  
})
