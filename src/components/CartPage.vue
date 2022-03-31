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

        <div class="overflow-auto grow h-screen">
            <div
                class="border bg-white border-gray-200 border-opacity-100 rounded shadow-md p-10 mb-3"
                v-for="item in store.state.cart"
                :key="item"
            >
                <p class="text-left font-medium">{{ item['name'] }}</p>

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
                            <p class="text-left mr-8">{{ stat.stat.name }}</p>
                            <p class="text-left">{{ stat.base_stat }}</p>
                        </div>
                    </div>

                    <div>${{ item['price'] }}</div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { useStore } from 'vuex'

export default {
    setup() {
        const store = useStore()

        const total = computed(() => {
            let total = 0
            store.state.cart.forEach((element) => {
                total += element.price
            })
            return total
        })
        return { store, total }
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
</style>
