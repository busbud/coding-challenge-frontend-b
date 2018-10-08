import LocalizedStrings from 'react-localization';

export const Translation = new LocalizedStrings({
    en: {
        hero: 'Search for bus trips now!',
        placeholderOrigin: 'Origin',
        placeholderDestination: 'Destination',
        origin: 'Your origin',
        destination: 'Your destination',
        date: 'Travel date',
        searchBtn: 'Search',
        busWay: 'one-way',
        numberOfPerson: '1 adult',
        createdBy: 'Created by Peter',
        route: 'routes',
        routeFrom: 'from',
        routeTo: 'to',
        routeOn: 'on',
        currency: '$',
        flightDuration: 'Duration',
        sortBy: 'Sort by: ',
        lowestPrice: 'Lowest price',
        travelTime: 'Fastest travel time',
        backtoTop: 'Back to top',
        loading: 'Getting results. Please wait.',
        fetchErrorMessage:
            'Oops! We encountered an error. Please try again later.',
        days: 'Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday',
        months:
            'January,February,March,April,May,June,July,August,September,October,November,December',
        noDepartures:
            'No departures available at the moment. Please try again later.',
        amenities: {
            amenities: 'Amenities',
            ac: 'Air Conditioning',
            wifi: 'Wifi',
            tv: 'TV',
            averageSeat: 'Average Seat',
            toilet: 'Toilet',
            food: 'Food',
            hotMeal: 'Hot Meal',
            legRoom: 'Leg Room',
            powerOutlet: 'Power Outlet'
        },
        terms: {
            refund: 'Refund',
            norefund: 'No Refund',
            kg_by_bag: 'Max {terms.kg_by_bag}kg per bag',
            extra_bag_cost: 'Extra bag cost {terms.extra_bag_cost}'
        }
    },
    fr: {
        hero: 'Rechercher des voyages en bus maintenant!',
        placeholderOrigin: 'Origine',
        placeholderDestination: 'Destination',
        origin: 'Ton origine',
        destination: 'Votre destination',
        date: 'Date de voyage',
        searchBtn: 'Chercher',
        busWay: 'une manière',
        numberOfPerson: '1 adulte',
        createdBy: 'Créé par Peter',
        route: 'itinéraires',
        routeFrom: 'de',
        routeTo: 'à',
        routeOn: 'sur',
        currency: '$',
        flightDuration: 'Durée',
        sortBy: 'Trier par: ',
        lowestPrice: 'Prix le plus bas',
        travelTime: 'Temps de trajet le plus rapide',
        backtoTop: 'Retour au sommet',
        loading: "Obtenir des résultats. S'il vous plaît, attendez.",
        fetchErrorMessage:
            'Oops! Nous avons rencontré une erreur. Veuillez réessayer plus tard.',
        days: 'Dimanche,Lundi,Mardi,Mercredi,Jeudi,Vendredi,Samedi',
        months:
            'Janvier,Février,Mars,Avril,Mai,Juin,Juillet,Août,Septembre,Octobre,Novembre,Nécembre',
        noDepartures:
            'Aucun départ disponible pour le moment. Veuillez réessayer plus tard.',
        amenities: {
            amenities: 'Équipements',
            ac: 'climatisation',
            wifi: 'Wifi',
            tv: 'TV',
            averageSeat: 'Siège moyen',
            toilet: 'toilette',
            food: 'nourriture',
            hotMeal: 'Repas chaud',
            legRoom: 'Leg Room',
            powerOutlet: 'Prise de courant'
        },
        terms: {
            refund: 'Rembourser',
            norefund: 'Aucun remboursement',
            kg_by_bag: 'Max {terms.kg_by_bag}kg par sac',
            extra_bag_cost: 'Coût du sac supplémentaire {terms.extra_bag_cost}'
        }
    }
});
