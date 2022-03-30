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
            <section class="flex xl:text-xl sm:text-2xl">
                <router-link to="/" class="nav-item text-rose-100"
                    >Store</router-link
                >
                <p class="nav-item text-rose-100">|</p>
                <router-link to="/" class="nav-item text-rose-100"
                    >Cart</router-link
                >
            </section>
        </section>
        <!-- <div class="pokemons text-black tracking-widest text-2xl py-3">gdfxahty412hsdfampqwfbxcz0941</div> -->
    </div>
</template>

<script>
import { fetchCharmander } from '@/utils/requests'
import { reactive } from '@vue/reactivity'
import { onBeforeMount } from '@vue/runtime-core'

export default {
    setup() {
        const state = reactive({
            charmander: null
        })

        onBeforeMount(async () => {
            const data = await fetchCharmander()
            state.charmander = data
        })

        return {
            state
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
</style>
