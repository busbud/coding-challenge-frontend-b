
export default {

    name: 'Loading',

    data () {

        return {

            isVisible: false
        }
    },

    methods: {

        showLoading () {

            this.isVisible = true
        },

        hideLoading () {

            this.isVisible = false
        }
    }
}