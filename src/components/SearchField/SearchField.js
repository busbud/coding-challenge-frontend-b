
import DateField from 'components/DateField/DateField.vue'
import Notifications from 'components/Notifications/Notifications.vue'
import Loading from 'components/Loading/Loading.vue'

export default {

    name: 'SearchField',

    components: {

        DateField,
        Notifications,
        Loading
    },

    data () {

        return {

            searchQuery: {

                origin: '',
                destination: '',
                dateFrom: null
            },
            searchSubmitted: false,
            loading: null
        }
    },

    mounted () {

        var self = this

        // On change, update dateFrom

        this.$on('dateFieldUpdated', function ( date ) {

            self.searchQuery.dateFrom = date
        })

        // Set loading

        this.loading = this.$refs.searchLoading
    },

    methods: {

        search () {

            var self = this

            // Validate data
    
            let validator = this.errors

            // Is data valid?

            if( validator.any() ) {

                this.searchSubmitted = true

                return false
            }
            else {

                // Show loading

                this.loading.showLoading()


                // Call store to initiate search

                this.$store.dispatch('searchForDepartures', {

                    origin: this.searchQuery.origin,
                    destination: this.searchQuery.destination,
                    dateFrom: this.searchQuery.dateFrom

                }).then(( response ) => {

                    // We got an error message

                    if( response.error ) {

                        // Hide loading

                        self.loading.hideLoading()


                        // Push error notification

                        let notifications = self.$refs.searchNotifications

                        notifications.pushMessage('error', response.message)


                        // Hide error messages

                        self.searchSubmitted = false
                    }
                    else {

                        // It works, look for departures

                        if( response.complete ) {

                            // Ping the app, new departures available

                            self.$root.$emit('newDeparturesAvailableEvent')


                            // Hide loading

                            self.loading.hideLoading()


                            // Hide error messages

                            self.searchSubmitted = false    
                        }
                        else {

                            // No departures already available, so fetch it

                            setTimeout( this.poll, 500)
                        }        
                    }
                })
                .catch(function (error) {
                    
                    // Hide loading

                    self.loading.hideLoading()


                    // Push error notification

                    let notifications = self.$refs.searchNotifications

                    notifications.pushMessage('error', error.message)


                    // Hide error messages

                    self.searchSubmitted = false
                })
            }
        },

        poll () {

            var self = this

            // Call store to fetch departures

            this.$store.dispatch('fetchDepartures', {

                origin: this.searchQuery.origin,
                destination: this.searchQuery.destination,
                dateFrom: this.searchQuery.dateFrom

            }).then(( response ) => {

                // We got an error message

                if( response.error ) {
 
                    // Hide loading

                    self.loading.hideLoading()


                    // Push error notification

                    let notifications = self.$refs.searchNotifications

                    notifications.pushMessage('error', response.message)


                    // Hide error messages

                    self.searchSubmitted = false    
                }
                else if( !response.complete ) {

                    // Not complete yet, wait 2s and fetch again

                    setTimeout( this.poll, 2000)
                }
                else {

                    // It works, ping the app, new departures available

                    self.$root.$emit('newDeparturesAvailableEvent')


                    // Hide loading

                    self.loading.hideLoading()


                    // Hide error messages

                    self.searchSubmitted = false
                }
            })
            .catch(function (error) {
                
                // Hide loading

                self.loading.hideLoading()


                // Push error notification

                let notifications = self.$refs.searchNotifications

                notifications.pushMessage('error', error.message)


                // Hide error messages

                self.searchSubmitted = false    
            })  
        }
    }
}