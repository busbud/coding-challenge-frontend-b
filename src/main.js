import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import VeeValidate from 'vee-validate'
import lodash from 'lodash'
import VueLodash from 'vue-lodash'
import Settings from '../config/settings'

Vue.use( Vuex )
Vue.use( VeeValidate )
Vue.use( VueRouter )
Vue.use(VueLodash, lodash)


Vue.config.devtools = Settings.debug


/* Routing Settings */

import routes from './routes'

export const router = new VueRouter({
	
	routes,
	hashbang: false,
	mode: 'history',
	linkActiveClass: 'active',
    scrollBehavior (to, from, savedPosition) {
    	
    	return { x: 0, y: 0 }
    }
})


/* Secured routes */

router.beforeEach(( to, from, next ) => {

	// Set meta title before rendering the page

	document.title = to.meta.title
	

	// Find meta description in all metas, then set it before rendering the page

	var meta = document.getElementsByTagName('meta');

	for (var i = 0; i < meta.length; i++) {

		if ( meta[i].name.toLowerCase() == 'description' ) {
			
			meta[i].content = to.meta.description
		}
	}

	// Continue...

	next()
})



/* Setup Application main view */

new Vue({
	
	el: '#app',
	
	router,

	components: {},

    methods: {},

	render: h => h( require('./pages/App/App.vue') )
})

