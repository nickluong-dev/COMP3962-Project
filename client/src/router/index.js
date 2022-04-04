import { createRouter, createWebHistory } from 'vue-router'
import FrontPage from '../views/FrontPage.vue'
import CartPage from '../views/CartPage.vue'
import SearchPage from '../views/SearchPage.vue'

const routes = [
    {
        path: '/',
        name: 'Front',
        component: FrontPage
    },
    {
        path: '/cart',
        name: 'Cart',
        component: CartPage
    },
    {
        path: '/search',
        name: 'Search',
        component: SearchPage
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
