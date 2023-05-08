<template>
  <div>home{{ num }}</div>
  <button @click="add">fjisffjsif</button>
</template>


<script>
import {ref} from 'vue'
export default {
  setup() {
    const num = ref(0)
    const add = () => {
      num.value++
    }
    return {num, add}
  }
}
 
</script>