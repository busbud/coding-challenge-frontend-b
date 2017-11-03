
export default {

    name: 'DeparturesListing',

    data () {

        return {

            departures: [],
            location: null
        }
    },

    mounted () {

        var self = this

        this.$root.$on('newDeparturesAvailableEvent', function (location) {

            // Update local departures

            self.departures = self.$store.getters.getDepartures
            self.location = location

            console.log( self.departures )
        })
    },

    filters: {

        prettyDate (value) {

            return moment(value).format('MMMM DD YYYY')
        },

        titleCase: function (value) {
        
            return value.split(' ').map(function (item) {

                return item.charAt(0).toUpperCase() + item.substring(1);

            }).join(' ');
        },

        price: function (value) {
            
            var newValue = value;

            if (value >= 1000) {

                var suffixes = ["", "k", "m", "b","t"];
                var suffixNum = Math.floor( (""+value).length/3 );
                var shortValue = '';

                for (var precision = 2; precision >= 1; precision--) {

                    shortValue = parseFloat( (suffixNum != 0 ? (value / Math.pow(1000,suffixNum) ) : value).toPrecision(precision));

                    var dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g,'');

                    if (dotLessShortValue.length <= 2) { break; }
                }

                if (shortValue % 1 != 0)  shortValue = shortValue.toFixed(1);

                newValue = shortValue+suffixes[suffixNum];
            }

            return '$' + newValue;
        }
    }
}