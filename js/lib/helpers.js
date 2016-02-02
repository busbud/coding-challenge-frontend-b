//Busbud helpers

//merge fetch and poll results: res2 can only complete or update res1.
//return a new result object
function mergeResult(res1,res2){

    // We first rebuild res2 to include res1 values, so that res2 properties can safely replace res1 properties
    var mergedRes2 = Object.keys(res2).reduce(function(acc,key){
        var val = res2[key];
        if (typeof val === 'object') { //'complete' the value if object
            if (Array.isArray(val)){
                acc[key]= [...res1[key],...res2[key]];
            }
            else {
                acc[key] = {...res1[key],...res2[key]};
            }
        }
        else { // assign the new value if not object
            acc[key]=res2[key];
        }
        return acc;
    },{});
    return {...res1,...mergedRes2}
}

// Return the time (hour, minute) for a localisation given as the language. NOT SUPPORTED BY SAFARI WHICH RETURN FULL TIME IN US FORMAT
function getFormattedTime(timeString,lang){
    let options = {
        hour: '2-digit',
        minute: '2-digit'
    };

    let date = new Date(Date.parse(timeString));

    return date.toLocaleTimeString(lang,options)
}

// Build a new location object with full origin and destination {location} objects + associated {city} object. Location is then passed to the Ticket component
function getTicketLocations(result, ticket){
    let locations = {
        origin:{},
        destination:{}
    };

    //find the locations object
    result.locations.reduce(function(acc,el){
        if (el.id === ticket.origin_location_id) {
            acc.origin = el;
        }
        if (el.id === ticket.destination_location_id){
            acc.destination = el;
        }
        return acc;
    },locations);

    //add the city object
    locations.origin.city = result.cities[0];
    locations.destination.city = result.cities[1];

    if (locations.origin.city.id !== locations.origin.city_id) {
        locations.origin.city = result.cities[1];
        locations.destination.city = result.cities[0];
    }

    return locations
}

//Retrieve the operator in order to pass it to the Ticket component
function getTicketOperator(result, ticket){
    return result.operators.find(function(el){
        return el.id === ticket.operator_id
    })
}

//Resize the operator logo
function getResizedLogo(url){
    return url.replace(/{[^{]+}/g,'100');
    //return url.replace(/{width}/g,width).replace(/{height}/g,height);
}

export default {
    mergeResult: mergeResult,
    getFormattedTime:getFormattedTime,
    getTicketLocations:getTicketLocations,
    getTicketOperator:getTicketOperator,
    getResizedLogo:getResizedLogo
}