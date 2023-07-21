<template lang="">
  <div>
    <h1>{{ msg }}</h1>
    <!-- <h2>{{ str }}</h2> -->
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

// import { Ref, ref } from 'vue';
// const msg: Ref<number> = ref(1);
const msg = ref('jfidfj');
</script>
<style scoped>
h1 {
  color: blue;
}
</style>
