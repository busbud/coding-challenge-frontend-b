angular.module("busbud.components", ["busbud.svc.departures", "pascalprecht.translate"]);
var app = angular.module("busbud-osheaga", ["ngRoute", "busbud.components"]);
app.config(function($routeProvider, $translateProvider) {
    $translateProvider.translations('fr', {
        'findTrip': 'Trouver un trajet en bus pour le festival Osheaga',
        'tripDescription': 'Trajet depuis #from# vers #to#'
    });

    $translateProvider.translations('en', {
        'findTrip': 'Find a bus ride to Osheaga festival',
        'tripDescription': 'Ride from #from# to #to#'
    });


    $routeProvider
        .when("/en", {
            resolve: {
                language: function(){
                    moment.locale("en");
                    $translateProvider.preferredLanguage('en')
                }
            }
        })
        .when("/fr", {
            resolve: {
                language: function(){
                    moment.locale("fr-ca");
                    $translateProvider.preferredLanguage('fr')
                }
            }
        })
        .otherwise({
            redirectTo: '/en'
        });
});
