
import Home from 'pages/Home/Home.vue'
import NotFoundError from 'pages/Error/NotFoundError/NotFoundError.vue'

const routes = [

    {
        path: '/',
        name: 'home',
        component: Home,
        meta: { 

            title: 'Coding Challenge Frontend | For Busbud',
            description: 'A microsite that lists bus travel schedules for a given route and a given date.'
        }
    },
    {
        path: '*',
        component: NotFoundError,
        meta: { 

            title: '404 Page Not Found | For Busbud',
            description: 'A microsite that lists bus travel schedules for a given route and a given date.'
        }
    }
];

export default routes
