import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        device_info: {
            device_name: '',
            vendor_id: '',
            product_id: ''
        },
        card_info: {
            card_id: '',
            text: ''
        }
    }
})