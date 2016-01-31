//Busbud helpers

//merge fetch and poll results: res2 can only complete or update res1.
//return a new result object
function mergeResult(res1,res2){

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
        else { // return the new value if not object
            acc[key]=res2[key];
        }
        return acc;
    },{});
    return {...res1,...mergedRes2}
}

function getFormattedTime(timeString){
    let options = {
        timeZone: 'UTC',
        hour: '2-digit',
        minute: '2-digit'
    };

    let date = new Date(Date.parse(timeString));

    return date.toLocaleTimeString('en-US',options)
}

function getTicketLocations(result, ticket){
    let locations = {
        origin:{},
        destination:{}
    };


    result.locations.reduce(function(acc,el){
        if (el.id === ticket.origin_location_id) {
            acc.origin = el;
        }
        if (el.id === ticket.destination_location_id){
            acc.destination = el;
        }
        return acc;
    },locations);

    locations.origin.city = result.cities[0];
    locations.destination.city = result.cities[1];

    if (locations.origin.city.id !== locations.origin.city_id) {
        locations.origin.city = result.cities[1];
        locations.destination.city = result.cities[0];
    }

    return locations
}

function getTicketOperator(result, ticket){
    return result.operators.find(function(el){
        return el.id === ticket.operator_id
    })
}

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