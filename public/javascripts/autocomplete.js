var originInput = document.getElementById("origin");
var originOptions = document.getElementsByClassName("search__options")[0];

var destinationInput = document.getElementById("destination");
var destinationOptions = document.getElementsByClassName("search__options")[1];

var cityArray = ['New York', 'Montreal', 'Toronto', 'Vancouver', 'Ottawa', 'Tadoussac', 'Quebec', 'Calgary', 'Red Deer'];

// Origin functions
originInput.onclick =function(){
  changeInput(this.value, originOptions);
};
originInput.onkeyup = function(){
  changeInput(this.value, originOptions);
  enableButton(this.id, this.value);
};
originInput.onblur=function(){
  deleteOptions(originOptions);
};

destinationInput.onclick =function(){
  changeInput(this.value, destinationOptions);
};
destinationInput.onkeyup = function(){
  changeInput(this.value, destinationOptions);
  enableButton(this.id, this.value);
};
destinationInput.onblur=function(){
  deleteOptions(destinationOptions);
};




function matchCities(input) {
  var reg = new RegExp(input.split('').join('\\w*').replace(/\W/, ""), 'i');
  return cityArray.filter(function(city) {
    if (city.match(reg)) {
      return city;
    }
  });
}

function changeInput(val, options) {
  var autoCompleteOptions = matchCities(val);
  deleteOptions(options);
  for(var i=0; i<autoCompleteOptions.length; i++){
    var item = autoCompleteOptions[i];
    var elem = document.createElement("li");
    elem.innerHTML=item;
    options.appendChild(elem);
    addEventHover(elem);
  }
}

function deleteOptions(options){
  while( options.firstChild ){
    options.removeChild( options.firstChild );
  }
}

function addEventHover(elem){
  elem.addEventListener("mouseover", function() {
    var input = this.closest(".search__options").previousSibling;
    input.value = this.innerHTML;
    enableButton(input.id, this.innerHTML);
  });
}

function enableButton(id, val){
  var button = document.getElementById("search__btn");
  if (cityArray.indexOf(val) > -1){
    button.classList.remove("error-" + id);
  }else{
    button.classList.add("error-" + id);
  };
  if( button.classList.contains('error-origin') || button.classList.contains('error-destination')){
    button.disabled = true;
  }else{
    button.disabled = false;
  }
}
