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

export default {
    mergeResult: mergeResult
}