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
        },
        remove(state, payload) {
            state.cart.splice(payload, 1)
            console.log(state.cart)
        }
    },
    actions: {
        add: (context, payload) => {
            context.commit('add', payload)
        },
        remove: (context, payload) => {
            context.commit('remove', payload)
        }
    }
})
