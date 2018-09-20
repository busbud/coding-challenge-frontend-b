
var dateSelect     = $('#bus-datepicker');
var dateDepart     = $('#departure');

dateSelect.datepicker({
  orientation: "bottom",
  autoclose: true,
  format: "dd-mm-yyyy",
  startDate: "now",
  defaultDate: "07-11-2011"
});

// Today is default value
var date = getFormattedDate(new Date())
dateDepart.attr("value", date);


function getFormattedDate(date) {
  var year = date.getFullYear();
  var month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : '0' + month;
  var day = date.getDate().toString();
  day = day.length > 1 ? day : '0' + day;
  return day + '-' + month + '-' + year;
}
