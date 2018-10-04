$(document).ready(function(){
	//BUTTON
	$('#search-button').click(function(e){
		$.ajax({
			method: "GET",
			url: "/get-info"
		})
		.done(function(response) {
    		addDataToTable('busbud-table', getTableFormat(response));
		});
	
		function getLocation(locations,id) { //recibe el id de departure location
			var result;
			locations.forEach(function(location) {
				if(location.id === id) {
					result = location.name;
				}
			});
			return result
		} 
		function getTableFormat(data) {
			var result = [];
			data.departures.forEach(function(trip) {
				result.push([ 
					data.cities[0].name,
					data.cities[1].name,
					getLocation(data.locations,trip.origin_location_id),
					getLocation(data.locations,trip.destination_location_id),
					trip.departure_time,
					trip.arrival_time,
					'$' + trip.prices.total]); 
			});

			return result
		}

		function addDataToTable(tableId, data) {
			var html = '';

			data.forEach(function(row){
				html +='<tr class="lala">';
				
				row.forEach(function(elem){
					var td =  '<td class="">'+elem+'</td>';
					html = html + td;
				})	
				html +='</tr>';
			});
			$('#' + tableId + ' tbody').append(html);
		}
		//DATE PICKER: start date
		$('#datepicker-startDate').daterangepicker({
		    "singleDatePicker": true,
		    "startDate": "04/27/2018",
		    "endDate": "05/03/2018",
		    "opens": "center"
		}, function(start, end, label) {
		  console.log('New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')');
		});
		
		//DATE PICKER: end date
		$('#datepicker-endDate').daterangepicker({
		    "singleDatePicker": true,
		    "startDate": "04/27/2018",
		    "endDate": "05/03/2018",
		    "opens": "center"
		}, function(start, end, label) {
		  console.log('New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')');
		});
	});
});


