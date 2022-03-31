import { createStore } from 'vuex'

export default createStore({
    state: {
        cart: [],
        count: 23
    },
    getters: {
        cartSize: (state) => {
            return Object.keys(state.cart).length
        }
    },
    mutations: {
        add(state, payload) {
            state.cart.push(payload)
        }
    },
    actions: {
        add: (context, payload) => {
            context.commit('add', payload)
        }
    }
})
