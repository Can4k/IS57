<script setup>

import PulseLoader from "vue-spinner/src/PulseLoader.vue";
</script>

<template>
  <pulse-loader class="loader" color="gold" :loading="true"></pulse-loader>
</template>

<style scoped>
.loader {
  z-index: 100;
  position: fixed;

  left: 50vw;
  top: 50vh;
  transform: translate(-50%, -50%);
}
</style>