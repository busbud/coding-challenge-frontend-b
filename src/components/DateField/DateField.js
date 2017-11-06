
import flatpickr from 'flatpickr'
import moment from 'moment'

export default {

    name: 'DateField',

    data () {

        return {

            isVisible: false
        }
    },

    mounted () {

        let self = this


        // Initialize datepicker

        flatpickr( this.$el, {

            dateFormat: 'Y-m-d',
            minDate: moment(new Date()).format('YYYY-MM-DD'),
            onChange: function(selectedDates, dateStr, instance) {
                
                if( selectedDates.length > 0 ) {

                    // Format date

                    let formattedDate = moment( selectedDates[0] ).format('YYYY-MM-DD')


                    // Trigger update event

                    self.$parent.$emit('dateFieldUpdated', formattedDate)
                }
            },
        });
    }
}