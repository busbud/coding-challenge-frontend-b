$(document).foundation();


$( window ).on( "load", function() {
    console.log( "window loaded" );


    function createNode(element) {
        return document.createElement(element);
    }


    function append(parent, el) {
        return parent.appendChild(el);
    }


    var ul = document.getElementById('departures');


    fetch('https://napi.busbud.com/x-departures/dr5reg/f25dvk/2017-07-29?adult=1', {
        method: 'GET',
        mode: 'cors',
        headers: {"Accept" : "application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/", "X-Busbud-Token" : "PARTNER_JSWsVZQcS_KzxNRzGtIt1A"
    }
    }).then(function(response) {
            return response.json();
    }).then(function(data) {
        console.log(data);
        if (data.complete) {
            process(data);
        } else {
            fetch('https://napi.busbud.com/x-departures/dr5reg/f25dvk/2017-07-28/poll/?index?adult=1', {
                method: 'GET',
                mode: 'cors',
                headers: {
                    "Accept": "application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/",
                    "X-Busbud-Token": "PARTNER_JSWsVZQcS_KzxNRzGtIt1A"
                }
            }).then(function(response) {
                return response.json();
            }).then(function(data) {
                process(data);
            })
        }
    });


    function process(data) {
        var item = data.departures;
        item.forEach(function (arrayitem) {
            var deptime = arrayitem.departure_time;
            var arrtime = arrayitem.arrival_time;
            var totalprice = arrayitem.prices.total;
            var li = createNode('li');

            li.innerHTML = data.cities[0].name + ' Departure Time: ' + deptime + ' ----> ' + data.cities[1].name + ' Arrival Time: ' + arrtime + ' Price: ' + totalprice;
            append(ul, li);
        })
    }


});

