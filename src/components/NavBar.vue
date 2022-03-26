<template>
  <div
    id="navBar" class="nav bg-rose-400 p-3">
    <section class="flex justify-between items-end">
      <h1 class="title text-rose-100"><span class="pokemons text-amber-300 text-4xl pl-3 pr-10">R</span>PokeMart</h1> 
      <section class="flex">
        <router-link to="/" class="nav-item text-rose-100">Store</router-link> <p class="nav-item text-rose-100">|</p>
        <router-link to="/" class="nav-item text-rose-100">Cart</router-link> 
      </section>
    </section>
    <!-- <div class="pokemons text-black tracking-widest text-2xl py-3">gdfxahty412hsdfampqwfbxcz0941</div> -->
  </div>
</template>


<script>

export default {
  setup () {
    return {
    }
  }
}
</script>

<style scoped>
.title {
  font-family: "Pokemon Classic";
  font-size: 3em;
}

.nav-item, .nav-item:visited {
  font-family: "Pokemon Classic";
  margin: 0 0.5em 0 0.5em;
  font-size: 1.5em;
  margin-bottom: 0.2em;
}

.router-link-exact-active:active{
    color: rgb(252 211 77);
}

.pokemons{
  font-family: "Pokemon Pixels 1";
}
</style>
