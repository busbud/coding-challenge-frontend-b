export default class Utils {
  getGeohashForCityName(cityName) {
    switch(cityName) {
      case "Montreal":
        return "f25dvk";
      
      case "New York":
        return "dr5reg"

      default: 
        return undefined;
    }
  }
}