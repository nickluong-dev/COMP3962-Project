<template>
    <div
        class="w-64 border bg-white border-gray-200 border-opacity-100 rounded shadow-md transform hover:bg-amber-50"
    >
        <div class="p-4">
            <div class="flex justify-center">
                <transition name="added">
                    <div
                        v-show="state.added"
                        class="rounded bg-rose-100 outline-black w-24 absolute text-body mt-10"
                    >
                        Added to cart!
                    </div>
                </transition>

                <transition-group name="load">
                    <img
                        v-if="state.loaded"
                        class="rounded-tl rounded-tr w-24 pt-3 justify-center"
                        :src="state.pokemonSprite"
                    />
                    <div v-else class="h-24"></div>
                </transition-group>
            </div>

            <div class="px-3 pb-3">
                <section class="flex flex-col items-start">
                    <hr class="round-line pb-2 w-full" />
                    <div class="text-name" v-if="state.pokemonInfo">
                        <div class="break-words text-left">
                            {{ state.pokemonInfo.name }}
                        </div>
                    </div>
                    <div class="text-price" v-if="state.pokemonInfo">
                        $
                        {{ price }}
                    </div>
                </section>

                <div class="mt-3">
                    <div class="flex justify-between">
                        <div>
                            <button
                                class="text-body bg-rose-200 rounded-sm px-2 py-1 tracking-tighter"
                                :class="{ buy: state.animate }"
                                @click="buy(pokemon)"
                            >
                                Buy
                            </button>
                        </div>

                        <button
                            @click="expanded = !expanded"
                            class="hover:scale-125 transition duration-300 ease-in-out"
                        >
                            <img src="@/assets/ultraball.png" alt="" />
                        </button>
                    </div>
                </div>

                <transition name="slide">
                    <div v-if="expanded">
                        <section
                            v-if="state.pokemonInfo"
                            class="text-body text-left pt-2"
                        >
                            <!-- <hr class="round-line pb-2" /> -->
                            <div
                                v-for="stats in state.pokemonInfo.stats"
                                :key="stats"
                                class="flex justify-between"
                            >
                                <p>{{ stats.stat.name }}</p>
                                <p>{{ stats.base_stat }}</p>
                            </div>
                        </section>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed } from 'vue'
import { fetchPokemonData } from '@/utils/requests'
import { onBeforeMount } from '@vue/runtime-core'
import { reactive } from '@vue/reactivity'
import { useStore } from 'vuex'

export default {
    props: {
        url: {
            type: String
        }
    },
    setup(props) {
        const state = reactive({
            pokemonInfo: null,
            pokemonSprite: null,
            loaded: null,
            animate: false,
            added: false
        })

        onBeforeMount(async () => {
            state.loaded = false
            const data = await fetchPokemonData(props.url)
            state.pokemonInfo = data
            state.pokemonSprite = data.sprites.front_default
            state.loaded = true
        })

        const store = useStore()

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

        const price = computed(() => {
            return Math.floor(
                state.pokemonInfo.base_experience *
                    (state.pokemonInfo.weight * 0.1)
            )
        })

        const pokemon = computed(() => {
            return {
                name: state.pokemonInfo.name,
                price: price.value,
                url: props.url,
                spriteUrl: state.pokemonSprite,
                data: state.pokemonInfo
            }
        })

        return {
            expanded: ref(false),
            state,
            pokemon,
            buy,
            price,
            buyAnimation
        }
    }
}
</script>

<style lang="css" scoped>
* {
    font-family: 'Pokemon Classic';
}

.text-body {
    font-size: 0.6em;
}

.text-price {
    font-size: 0.7em;
}

.text-name {
    font-size: 0.8em;
}

.round-line {
    border-top: 2px solid;
    border-radius: 0px;
}

/* Detail slide transition */
.slide-enter-active,
.slide-leave-active {
    transition: all ease-in-out 0.3s;
    max-height: 300px;
}

.slide-enter-from,
.slide-leave-to {
    opacity: 0;
    max-height: 0;
}

/* Card load transition */
.load-enter-from,
.load-leave-to {
    opacity: 0;
}

.load-enter-active,
.load-leave-active {
    transition: all 3s ease;
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
