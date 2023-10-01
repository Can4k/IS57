<script setup>
import { computed } from "vue";

const props = defineProps({
  result: {type: Object}
})

const emit = defineEmits([
  'show_all_stat'
])

const IsThirdBuilding = computed(() => props.result?.team?.building === 3);
</script>

<template>
  <div v-show="result" class="statistics">
    <h2>
      {{result?.team?.name}}

      <span :class="[IsThirdBuilding ? 'slitherin' : 'gryffindor']" class="building">
        {{IsThirdBuilding ? 'Третье' : 'Первое'}} здание
      </span>
    </h2>
    <div class="statistics-tags">
      <div class="place">
        Место во всей школе - {{result?.team?.all_place}}
      </div>

      <div class="place">
        Место внутри здания - {{result?.team?.local_place}}
      </div>
    </div>

    <button @click="emit('show_all_stat')" class="show-stats">Подробная статистика</button>
  </div>
</template>

<style scoped>
.statistics {
  font-family: 'HarryPotter', sans-serif;
  background-color: #00001c;
  color: white;

  border-radius: 8px;
  padding: 16px;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.statistics > h2 {
  font-weight: 500;
  margin: 0 0 2px;
  display: flex;
  align-items: center;
}

.statistics-tags {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.statistics-tags > * {
  border: 1px solid white;
  border-radius: 8px;
  padding: 4px;
  margin: 4px;
  font-size: 18px;
}

.building {
  font-size: 16px;
  border: 1px solid white;
  border-radius: 8px;
  padding: 4px;
  margin: 4px 0 4px 8px;
  flex: 1;

  text-align: center;
}

.slitherin {
  border: 1px solid #0fc70f;
  color: #0fc70f;
}

.gryffindor {
  border: 1px solid gold;
  color: gold;
}

.place {
  flex: 1;
  text-align: center;
  max-width: 200px;
}

.show-stats {
  margin-top: 6px;
  padding: 6px 10px;
  border-radius: 8px;
  width: calc(100% - 8px);
  border: 1px solid white;
  background-color: #282832;
  color: white;
  font-family: 'HarryPotter', sans-serif;
  font-size: 22px;
  max-width: 408px;
  cursor: pointer;
  transition-duration: .5s;
}

.show-stats:hover {
  background-color: #23233b;
}

@media screen and (min-width: 1000px){
  .statistics > h2 {
    letter-spacing: 0;
    font-size: 32px;
  }
}
</style>