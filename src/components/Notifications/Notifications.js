
export default {

    name: 'Notifications',

    data () {

        return {

            messages: []
        }
    },

    methods: {

        pushMessage (type, error) {

            // Is error an array

            if( Array.isArray(error) ) {

                // Push them all

                for (var i = error.length - 1; i >= 0; i--) {

                    this.messages.push({

                        type,
                        text: error[i].msg || error[i]
                    })

                    setTimeout( this.deleteMessage, 4000 )
                }
            }
            else {

                // Push the message

                this.messages.push({

                    type,
                    text: error
                })

                setTimeout( this.deleteMessage, 4000 )
            }
        },

        deleteMessage () {

            this.messages.pop()
        }
    }
}