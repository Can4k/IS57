<script setup>

import {computed, onMounted} from "vue";

const emit = defineEmits([
    'go'
])

const props = defineProps({
  result: {type: Object},
  height: {type: Number},
  width: {type: Number}
})

const CastleStyle = computed(() => {
  return {
    height: props.height + 'px',
    width: props.width + 'px',
  }
})

</script>

<template>
  <div @click="emit('go', {id: result.team.id})" :style="CastleStyle" class="castle">
    <div class="Top"/>
    <div class="Bottom"/>
  </div>
</template>

<style scoped>

.castle {
  display: flex;
  flex-direction: column;
  align-items: stretch;

  user-select: none;
  cursor: pointer;
}

.Bottom {
  flex: 1;
  background-color: #8d7b65;
}

.Top {
  height: 35%;
  background-color: #39383d;
}

.castle {
  margin: 0 16px;
}
</style>