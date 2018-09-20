// Toogle when click on the input
$(".passengers > .form-control").click(function(e){
  $(".passengers__details").show();
  e.stopPropagation();
  return false;
});

// Close when click out passengers
$(document).click(function() {
  $(".passengers__details").hide();
});
$(".passengers__details").click(function(e) {
  e.stopPropagation();
  return false;
});


// Funcion to subtract passengers(no less than 1 passengers)
$(".passenger--subtract").each(function () {
  this.onclick =function(){
    var specificPassengers = $(this).siblings( "input" );
    var specificValue = Number(specificPassengers.val()) - 1;

    var totalPassengers = $(".passenger--number");
    var totalValue = Number(totalPassengers.html()) - 1;

    if (specificValue >= 0 && totalValue >= 1){
      specificPassengers.val(specificValue);
      totalPassengers.html(totalValue);
    }
  };
});

// Funcion to add passengers(no more than 10 passengers)
$(".passenger--add").each(function () {
  this.onclick =function(){
    var specificPassengers = $(this).siblings( "input" );
    var specificValue = Number(specificPassengers.val()) + 1;
    var totalPassengers = $(".passenger--number");
    var totalValue = Number(totalPassengers.html()) + 1;

    if (totalValue <= 10){
      specificPassengers.val(specificValue);
      totalPassengers.html(totalValue);
    }
  };
});
