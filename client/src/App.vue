<template>
    <div class="bg-rose-100">
        <NavBar />
        <div
            class="flex justify-center w-full min-h-screen pt-16 transition-all duration-150 ease-in-out md:pt-0 md:px-10"
        >
            <div class="w-full py-6 pl-3 pr-3 lg:p-10">
                <RouterView v-slot="{ Component }">
                    <transition name="route" mode="out-in">
                        <component :is="Component"></component>
                    </transition>
                </RouterView>
            </div>
        </div>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar'

export default {
    components: { NavBar },
    name: 'App'
}
</script>

<style>
@font-face {
    font-family: 'Pokemon Classic';
    src: local('Pokemon Classic'),
        url(./fonts/Pokemon_Classic.ttf) format('truetype');
}

@font-face {
    font-family: 'Pokemon Pixels 1';
    src: local('Pokemon Pixels 1'), url(./fonts/POKPIX1.ttf) format('truetype');
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
    padding: 30px;
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
}

#nav a.router-link-exact-active {
    color: #42b983;
}

.route-enter-from {
    opacity: 0;
    transform: translateX(-100px);
}

.route-enter-active {
    transition: all 0.5s ease-out;
}

.route-leave-to {
    opacity: 0;
    transform: translateX(100px);
}

.route-leave-active {
    transition: all 0.5s ease-out;
}
</style>
