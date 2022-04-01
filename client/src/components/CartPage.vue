<template>
    <section class="flex">
        <div
            class="h-fit border bg-white border-gray-200 border-opacity-100 rounded shadow-md p-10 mr-10 text-left"
        >
            <div class="font-bold pb-4">Hello trainer. Here is your cart!</div>
            <div class="mb-3">Items:</div>
            <div v-for="item in store.state.cart" :key="item" class="ml-10">
                <div class="flex justify-between">
                    <div>>> {{ item['name'] }}</div>
                    <div>${{ item['price'] }}</div>
                </div>
            </div>
            <hr class="round-line my-3 w-full" />

            <div class="flex justify-between mt-3 mb-5">
                <div>Total:</div>
                <div>${{ total }}</div>
            </div>

            <button
                class="text-body bg-rose-200 rounded-sm px-2 py-1 tracking-tighter"
            >
                Checkout
            </button>
        </div>

        <transition name="fade" mode="out-in">
            <div class="" v-if="Object.keys(store.state.cart).length == 0">
                you have nothing in your cart yet
            </div>
            <div v-else class="grow">
                <transition-group name="remove">
                    <div
                        class="w-full border bg-white border-gray-200 border-opacity-100 rounded shadow-md p-10 mb-3"
                        v-for="(item, index) in store.state.cart"
                        :key="item['id']"
                        :data-index="index"
                    >
                        <div class="flex justify-between">
                            <p class="text-left font-medium">
                                {{ item['name'] }}
                            </p>
                            <button @click="remove(index)">x</button>
                        </div>

                        <div class="flex items-center justify-around">
                            <div class="p-3">
                                <img
                                    class="w-24 h-24"
                                    :src="item['spriteUrl']"
                                    alt=""
                                />
                            </div>

                            <div>
                                <div
                                    class="flex justify-between"
                                    v-for="stat in item['data'].stats"
                                    :key="stat"
                                >
                                    <p class="text-left mr-8">
                                        {{ stat.stat.name }}
                                    </p>
                                    <p class="text-left">
                                        {{ stat.base_stat }}
                                    </p>
                                </div>
                            </div>

                            <div>${{ item['price'] }}</div>
                        </div>
                    </div>
                </transition-group>
            </div>
        </transition>
    </section>
</template>

<script>
import { computed, ref } from '@vue/runtime-core'
import { useStore } from 'vuex'

export default {
    setup() {
        const store = useStore()

        const remove = (payload) => {
            store.dispatch('remove', payload)
        }

        const total = computed(() => {
            let total = 0
            store.state.cart.forEach((element) => {
                total += element.price
            })
            return total
        })
        return {
            store,
            total,
            remove,

            removing: ref(false)
        }
    }
}
</script>

<style scoped>
* {
    font-family: 'Pokemon Classic';
}
.round-line {
    border-top: 2px solid;
    border-radius: 0px;
}

/* remove animation */

.remove-enter-from {
    opacity: 0;
    transform: translateX(-100px);
}

.remove-enter-active {
    transition: all 0.5s ease-out;
}

.remove-leave-to {
    opacity: 0;
    transform: translateX(100px);
}

.remove-leave-active {
    transition: all 0.5s ease-out;
    position: absolute;
}

.remove-move {
    transition: all 0.7s ease-out;
}

.fade-enter-from {
    opacity: 0;
    transform: translateX(-100px);
}

.fade-enter-active {
    transition: all 0.5s ease-out;
}

.fade-leave-to {
    opacity: 0;
    transform: translateX(100px);
}

.fade-leave-active {
    transition: all 0.5s ease-out;
}
</style>
