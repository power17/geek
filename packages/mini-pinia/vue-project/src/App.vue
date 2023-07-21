<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import { useCounterStore, defineStore } from './pinia'
const countState = useCounterStore()
const useStore = defineStore('count',{
  state() {
    return {
      count:0
    }
  },
  actions: {}
});
const counter = useStore()

</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper" @click="countState.count++">
      <HelloWorld msg="You did it!" />
      {{ countState.count }}
    </div>
    <div @click="counter.count++">
      {{ counter.count }}
    </div>
  </header>

  <main>
    <TheWelcome />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
