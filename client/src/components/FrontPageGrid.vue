<template>
    <section>
        <transition appear @before-enter="beforeEnter" @enter="enter">
            <div class="flex justify-center">
                <button class="refresh flex" @click=";[animate(), refresh()]">
                    Refresh!
                    <img
                        class="mb-3 w-6 ml-3"
                        :class="{ masterball: state.animate }"
                        src="@/assets/masterball.png"
                    />
                </button>
            </div>
        </transition>

        <div
            class="grid gap-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6"
        >
            <transition-group appear @before-enter="beforeEnter" @enter="enter">
                <Item
                    v-for="(Item, index) in state.pokemons.results"
                    :key="Item"
                    :url="Item.url"
                    :data-index="index"
                ></Item>
            </transition-group>
        </div>
    </section>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { onBeforeMount } from '@vue/runtime-core'
import { fetchPokemons } from '@/utils/requests'
import Item from '@/components/FrontPageItem.vue'
import gsap from 'gsap'

export default {
    components: {
        Item
    },
    setup() {
        const state = reactive({
            pokemons: [],
            animate: false
        })

        onBeforeMount(async () => {
            const pokemonData = await fetchPokemons(
                24,
                Math.floor(Math.random() * 1100)
            )
            state.pokemons = pokemonData
        })

        const refresh = async () => {
            const pokemonData = await fetchPokemons(
                24,
                Math.floor(Math.random() * 1100)
            )
            state.pokemons = pokemonData
        }

        const animate = () => {
            state.animate = !state.animate
            setTimeout(function () {
                state.animate = false
            }, 1000)
        }

        const beforeEnter = (el) => {
            el.style.transform = 'translateX(-50px)'
            el.style.opacity = 0
        }

        const enter = (el, done) => {
            gsap.to(el, {
                x: 0,
                opacity: 1,
                duration: 1,
                ease: 'bounce.out',
                delay: el.dataset.index * 0.04,
                onComplete: done
            })
        }

        return {
            state,
            beforeEnter,
            enter,
            refresh,
            animate
        }
    }
}
</script>

<style scoped>
.refresh {
    font-family: 'Pokemon Classic';
}

.masterball {
    animation: fall 0.25s ease-in-out,
        shake 1.2s cubic-bezier(0.36, 0.07, 0.19, 0.97) 2;
}

@keyframes shake {
    0% {
        transform: translate(0, 0) rotate(0);
    }
    20% {
        transform: translate(-5px, 0) rotate(-7deg);
    }
    30% {
        transform: translate(3px, 0) rotate(4deg);
    }
    50% {
        transform: translate(-5px, 0) rotate(-5deg);
    }
    60% {
        transform: translate(3px, 0) rotate(5deg);
    }
    100% {
        transform: translate(0, 0) rotate(0);
    }
}
</style>
