<template lang="">
  <router-view></router-view>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from './store/user';
const user = useUserStore();

const msg = ref('jfidfj');
</script>
<style scoped>
h1 {
  color: blue;
}
</style>
