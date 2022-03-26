<template>
  <div
    id="nav"
    class="outline outline-black outline-1 flex items-end bg-violet-700"
  >
    <h1 class="title">PokeMart</h1>
    <router-link to="/" class="nav-item outline-1">Home</router-link>
    |
    <router-link to="/about" class="nav-item">About</router-link>
  </div>
  <router-view />
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style lang="css" scoped>
.title {
  font-family: "Pokemon Classic";
  font-size: 3em;
}

.nav-item {
  font-family: "Pokemon Classic";
  margin: 0 1em 0 1em;
  font-size: 1.2em;
}
</style>
