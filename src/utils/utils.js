export function getGeohashForCityName(cityName) {
  switch(cityName) {
    case "Montreal":
      return "f25dvk";
    
    case "New York":
      return "dr5reg"

    default: 
      return undefined;
  }
}

export function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}