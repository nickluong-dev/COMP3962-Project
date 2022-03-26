<template>
    <div class="grid md:grid-cols-3 gap-5 lg:grid-cols-4 sm: grid-cols-2 xl:grid-cols-5 2xl:grid-cols-6">
        <Item/>
        <Item/>
        <Item/>
        <Item/>
        <Item/>
        <Item/>
        <Item/>
        <Item/>
        <Item/>
        <Item/>
        <Item/>
        <Item/>
    </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { onBeforeMount } from '@vue/runtime-core'
import { fetchPokemonData } from '@/utils/requests'
import Item from'@/components/FrontPageItem.vue'

export default {
    components: {
        Item
    },
    setup () {
        const state = reactive({
            pokemons: []
        })

        onBeforeMount(async () => {
            const pokemonData = await fetchPokemonData(30, 20)
            state.pokemons = pokemonData
        })

        return {
            state
        }
    }
}
</script>

<style lang="scss" scoped>

</style>