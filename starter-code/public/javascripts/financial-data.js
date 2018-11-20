function graph() {
	beginDate = document.getElementById("beginDate").value;
	endDate = document.getElementById("endDate").value;
	
	var bd = new Date(beginDate + "Z");
	var ed = new Date(endDate + "Z");
	
	var options = { weekday: "long", year: "numeric", month: "short", day: "numeric" };  
	if (beginDate !== "") { document.getElementById("begindate").innerText = bd.toLocaleDateString("en-US", options);  }
	if (endDate !== "") { document.getElementById("enddate").innerText = ed.toLocaleDateString("en-US", options); }
	 		
	//document.getElementById("begindate").innerText = beginDate;
	//document.getElementById("enddate").innerText = endDate;
	
	var s = document.getElementById("currency");
	var currency = s.options[s.selectedIndex].value;
	
	//if (beginDate !== "" && endDate !== "") {
		axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${beginDate}&end=${endDate}&currency=${currency}`)
			.then((res) => {
				Bitdata = {...res.data.bpi};
				data = Object.keys(Bitdata).map(key => Bitdata[key]);
				labels = Object.keys(Bitdata);
				
				document.getElementById("min").innerText = Math.min.apply(null, data);
				document.getElementById("max").innerText = Math.max.apply(null, data); 

				var ctx = document.getElementById("myChart").getContext('2d');
				var myChart = new Chart(ctx, {
					type: 'line',
					data: {
						labels: labels,
						datasets: [{
							data: data,
							label: 'Bitcoin',
							borderWidth: 1,
						}]
					},
					options: {
						elements: {
							line: {
								tension: 0
							}
						},
						title: {
							display: true,
							text: 'Bitcoin Price'
						}
					}
				});

			});
	//}
}