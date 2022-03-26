<template>
  <div class=" w-52 border border-gray-200 border-opacity-100 rounded shadow-md ">
    <q-card>
      <img class="rounded-tl rounded-tr" src="https://cdn.quasar.dev/img/parallax2.jpg"/>
        <div class="m-3">
            <section class="flex flex-col items-start">
            <div class="text-name">Name</div>
            <div class="text-price">₽ 100</div>
            </section>

            <div class="mt-3">
                <q-card-actions class="flex justify-between">
                <div>
                    <button class="text-body bg-rose-400 rounded-sm px-1 py-1 tracking-tighter">Add to Cart</button>
                </div>

                <q-btn
                    color="grey"
                    round
                    class="text-black text-xl"
                    :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
                    @click="expanded = !expanded"
                />
                </q-card-actions>
            </div>
            
            
            <q-slide-transition>
            <div v-show="expanded">
                <q-separator />
                <q-card-section class="text-body text-left">
                {{ data }}
                </q-card-section>
            </div>
            </q-slide-transition>
        </div>
    </q-card>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    return {
      expanded: ref(false),
      data: 'Pokemon info'
    }
  }
}
</script>

<style lang="scss" scoped>
.text-body {
  font-family: "Pokemon Classic";
  font-size: 0.6em;
}

.text-price {
  font-family: "Pokemon Classic";
  font-size: 0.8em;
}

.text-name {
  font-family: "Pokemon Classic";
  font-size: 1em;
}
</style>