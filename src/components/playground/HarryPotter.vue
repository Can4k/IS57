<script setup>
import { ref, watch } from "vue";

const PotterStyle = ref({
  animation: '2s harrypotter1 infinite ease-in-out'
})

const props = defineProps({
  direction: Number
})

watch(() => props.direction, (val) => {
  PotterStyle.value.animation = `2s harrypotter${val} infinite ease-in-out`;
})
</script>

<template>
  <img alt="Гарри Поттер" :style="PotterStyle" class="harry-potter" src="@/assets/textures/HarryPotter.png">
</template>

<style scoped>
.harry-potter {
  position: absolute;
  bottom: 0;
  left: calc(50% - 100px);
  z-index: 100;
  transition-duration: .5s;
}

@media screen and (max-width: 600px){
  .harry-potter {
    width: 64px;
  }
}

</style>

<style>
@keyframes harrypotter1 {
  0%, 100% {
    transform: translateY(10px);
  }
  50% {
    transform: translateY(0px);
  }
}

@keyframes harrypotter2 {
  0%, 100% {
    transform: translateY(10px) scaleX(-1);
  }
  50% {
    transform: translateY(0px) scaleX(-1);
  }
}
</style>