<template>
    <div class="flex justify-center">
        <transition appear @before-enter="beforeEnter" @enter="enter">
            <div
                v-if="state.loaded"
                class="w-3/4 border bg-white border-gray-200 border-opacity-100 rounded shadow-md p-3"
            >
                <div class="flex justify-between">
                    <div class="flex flex-col items-center">
                        <transition name="added">
                            <div
                                v-show="state.added"
                                class="rounded bg-rose-100 outline-black w-24 absolute text-body mt-10"
                            >
                                Added to cart!
                            </div>
                        </transition>
                        <img
                            class="w-44 h-44"
                            :src="state.searchedPokemon.sprites.front_default"
                        />
                        <div class="mb-5">
                            $
                            {{ price }}
                        </div>
                        <div>
                            <button
                                class="bg-rose-200 rounded-sm px-2 py-1 mb-5 tracking-tighter"
                                :class="{ buy: state.animate }"
                                @click="buy(pokemon)"
                            >
                                Buy
                            </button>
                        </div>
                    </div>
                    <div class="flex flex-col justify-center">
                        <section class="text-left">
                            <div>#{{ state.searchedPokemon.id }}</div>
                            <div class="font-semibold text-md">
                                {{ state.searchedPokemon.name }}
                            </div>
                            <div>
                                type:
                                {{ state.searchedPokemon.types[0].type.name }}
                            </div>
                            <div>
                                height: {{ state.searchedPokemon.height }}
                            </div>
                            <div>
                                weight: {{ state.searchedPokemon.weight }}
                            </div>
                        </section>
                    </div>

                    <section
                        class="flex flex-col text-left p-5 w-1/2 justify-center"
                    >
                        <div
                            v-for="stats in state.searchedPokemon.stats"
                            :key="stats"
                            class="flex justify-between"
                        >
                            <p>{{ stats.stat.name }}</p>
                            <p>{{ stats.base_stat }}</p>
                        </div>
                    </section>
                </div>
            </div>
            <div v-else class="mt-20">nothing here . . .</div>
        </transition>
    </div>
</template>

<script>
import { fetchSearchedPokemon } from '@/utils/requests'
import { computed, onBeforeMount, watch } from '@vue/runtime-core'
import { reactive } from '@vue/reactivity'
import { useStore } from 'vuex'
import gsap from 'gsap'

export default {
    setup() {
        const store = useStore()
        const state = reactive({
            searchedPokemon: null,
            loaded: false,
            animate: false,
            added: false
        })

        onBeforeMount(async () => {
            const data = await fetchSearchedPokemon(store.getters.search)
            state.searchedPokemon = data
            state.loaded = true
        })

        watch(
            () => store.getters.search,
            () => {
                state.searchedPokemon = getSearchPokemon()
            }
        )

        const getSearchPokemon = async () => {
            state.loaded = false
            const data = await fetchSearchedPokemon(store.getters.search)
            state.searchedPokemon = data
            state.loaded = true
        }

        const buy = (payload) => {
            store.dispatch('add', payload)

            buyAnimation()
        }

        const buyAnimation = () => {
            state.added = true
            state.animate = !state.animate
            setTimeout(function () {
                state.animate = false
                state.added = false
            }, 1500)
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

        const price = computed(() => {
            return Math.floor(
                state.searchedPokemon.base_experience *
                    (state.searchedPokemon.weight * 0.1)
            )
        })

        const pokemon = computed(() => {
            return {
                name: state.searchedPokemon.name,
                price: price.value,
                url: `https://pokeapi.co/api/v2/pokemon/${state.searchedPokemon.name}`,
                spriteUrl: state.searchedPokemon.sprites.front_default,
                data: state.searchedPokemon
            }
        })

        return {
            state,
            beforeEnter,
            enter,
            buy,
            pokemon,
            price
        }
    }
}
</script>

<style lang="scss" scoped>
* {
    font-family: 'Pokemon Classic';
}

/* buy button animation */
.buy {
    animation: fall 0.25s ease-in-out,
        shake 1.2s cubic-bezier(0.36, 0.07, 0.19, 0.97) 2;
}

@keyframes shake {
    0% {
        transform: translate(0, 0);
    }
    20% {
        transform: translate(0, -2px);
    }
    30% {
        transform: translate(0, 3px);
    }
    50% {
        transform: translate(0, -3px);
    }
    60% {
        transform: translate(0, 3px);
    }
    100% {
        transform: translate(0, 0);
    }
}

/* added to cart animation */
.added-enter-from,
.added-leave-to {
    opacity: 0;
    transform: translateY(-20px);
}

.added-enter-active,
.added-leave-active {
    transition: all 1s ease;
}
</style>
