import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import {store} from './store.js'

import Home from './components/pages/Home.vue'
import Page1 from './components/pages/Page1.vue'
import Page2 from './components/pages/Page2.vue'

import NFCApp from './nfcapp.js'

Vue.use(VueRouter)
Vue.use(NFCApp)

const router = new VueRouter({
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/page1',
            component: Page1
        },
        {
            path: '/page2',
            component: Page2
        },
    ]
})

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
