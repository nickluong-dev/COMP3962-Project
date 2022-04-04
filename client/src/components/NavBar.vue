<template>
    <div id="navBar" class="nav bg-rose-400 p-3">
        <section class="flex justify-between items-end">
            <img
                class="absolute h-16 mt-4 sm:mt-4 sm:h-16 xl:h-28 xl:mt-8"
                v-if="state.charmander"
                :src="state.charmander.sprites.front_default"
            />
            <h1
                class="title text-rose-100 flex xl:ml-24 xl:text-5xl sm:text-2xl sm:ml-16 ml-14"
            >
                PokeMart
            </h1>

            <form class="flex h-10 w-1/3">
                <input
                    type="text"
                    id="search"
                    name="search"
                    v-model="searchParam"
                    class="h-full w-full px-4 py-2 border border-gray-300 rounded-l-md bg-white font-body text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-100"
                />
                <router-link to="/search">
                    <button
                        class="flex justify-center items-center h-full px-2 border-t border-r border-b border-gray-300 rounded-r-md font-body bg-gray-200 hover:bg-gray-300 active:bg-gray-100"
                        @click="search(searchParam)"
                    >
                        <svg
                            class="fill-current text-gray-500"
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 0 24 24"
                            width="24px"
                            fill="#FFFFFF"
                        >
                            <path d="M0 0h24v24H0V0z" fill="none" />
                            <path
                                d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
                            />
                        </svg>
                    </button>
                </router-link>
            </form>
            <section class="flex xl:text-xl sm:text-2xl">
                <router-link to="/" class="nav-item text-rose-100"
                    >Store</router-link
                >
                <p class="nav-item text-rose-100">|</p>
                <router-link to="/cart" class="nav-item text-rose-100 flex"
                    >Cart
                    <div
                        class="bg-white rounded w-4 h-4 cart-count flex justify-center items-center"
                    >
                        <span class="text-black">{{ cartSize }}</span>
                    </div></router-link
                >
            </section>
        </section>
        <!-- <div class="pokemons text-black tracking-widest text-2xl py-3">gdfxahty412hsdfampqwfbxcz0941</div> -->
    </div>
</template>

<script>
import { fetchCharmander } from '@/utils/requests'
import { reactive } from '@vue/reactivity'
import { computed, onBeforeMount } from '@vue/runtime-core'
import { useStore } from 'vuex'

export default {
    setup() {
        const state = reactive({
            charmander: null
        })

        onBeforeMount(async () => {
            const data = await fetchCharmander()
            state.charmander = data
        })

        const store = useStore()
        const cartSize = computed(() => {
            return store.getters.cartSize
        })

        const search = (searchParam) => {
            store.dispatch('storeSearch', searchParam)
        }

        return {
            search,
            state,
            cartSize
        }
    }
}
</script>

<style scoped>
.title {
    font-family: 'Pokemon Classic';
    /* font-size: 3em; */
}

.nav-item,
.nav-item:visited {
    font-family: 'Pokemon Classic';
    margin: 0 0.5em 0 0.5em;
}

.router-link-exact-active:active {
    color: rgb(252 211 77);
}

.pokemons {
    font-family: 'Pokemon Pixels 1';
}

.cart-count {
    font-size: 0.5em;
}
</style>
