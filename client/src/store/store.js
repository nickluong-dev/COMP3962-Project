import { createStore } from 'vuex'

export default createStore({
    state: {
        cart: [],
        count: 23,
        search: null
    },
    getters: {
        cartSize: (state) => {
            return Object.keys(state.cart).length
        },
        search: (state) => {
            return state.search
        }
    },
    mutations: {
        add(state, payload) {
            state.cart.push(payload)
        },

        remove(state, payload) {
            state.cart.splice(payload, 1)
        },
        removeAll(state) {
            state.cart = []
        },
        storeSearch(state, payload) {
            state.search = payload
        }
    },
    actions: {
        add: (context, payload) => {
            context.commit('add', payload)
        },

        remove: (context, payload) => {
            context.commit('remove', payload)
        },
        removeAll: (context) => {
            context.commit('removeAll')
        },
        storeSearch: (context, payload) => {
            context.commit('storeSearch', payload)
        }
    }
})
