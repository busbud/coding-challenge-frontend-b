import Vue from 'vue'
import Router from 'vue-router'
import RoadToOsheaga from '@/components/RoadToOsheaga'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'RoadToOsheaga',
      component: RoadToOsheaga
    }
  ]
})
