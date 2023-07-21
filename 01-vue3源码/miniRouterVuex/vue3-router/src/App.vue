

<template>
  <router-link to="/foo">foo</router-link>|
  <router-link to="/home">home</router-link>
  <router-view> </router-view>
  <!-- <div @click="add">count : {{ $store.state.count }}</div> -->
  <div @click="$store.state.count++">count : {{$store.state.count  }}</div>
  <p>doubleCount: {{$store.getters.doubleCount }}</p>
</template>
<script setup>
import {getCurrentInstance} from 'vue'
const app = getCurrentInstance()
// console.log(app, '$store')s
const add = () =>{
  app.$store.state.count++
}

</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
