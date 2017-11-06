
import moment from 'moment'

export default {

    name: 'DeparturesListing',

    data () {

        return {

            departures: [],
            locations: [],
            operators: [],
            cities: [],
            originCity: null,
            destinationCity: null,
            fetched: false
        }
    },

    mounted () {

        var self = this

        this.$root.$on('newDeparturesAvailableEvent', function () {

            // Get Locations, Operators and Cities from store

            self.locations = self.$store.getters.getLocations
            self.operators = self.$store.getters.getOperators
            self.cities = self.$store.getters.getCities

            // Set origin and destination cities if available

            if( self.cities.length === 2 ) {

                self.originCity = self.cities[0] // Origin
                self.destinationCity = self.cities[1] // Destination
            }


            // Format and update local departures

            self.formatAndSetDepartures()


            // Set fetched to true

            self.fetched = true
        })
    },

    methods: {

        formatAndSetDepartures () {

            let rawDepartures = this.$store.getters.getDepartures

            // Set departure/arrival locations for each departure

            for (var i = rawDepartures.length - 1; i >= 0; i--) {

                for (var j = this.locations.length - 1; j >= 0; j--) {

                    if( rawDepartures[i].origin_location_id === this.locations[j].id ) {

                        rawDepartures[i].departureLocation = this.locations[j]
                    }

                    if( rawDepartures[i].destination_location_id === this.locations[j].id  ) {

                        rawDepartures[i].destinationLocation = this.locations[j]
                    }
                }
            }

            // Set to local departures

            this.departures = rawDepartures
        }
    },

    filters: {

        time (value) {

            return moment(value).format('H:mm A')
        },

        titleCase: function (value) {
        
            return value.split(' ').map(function (item) {

                return item.charAt(0).toUpperCase() + item.substring(1);

            }).join(' ');
        },

        price: function (rawValue) {
            
            let value = rawValue / 100

            return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
    }
}