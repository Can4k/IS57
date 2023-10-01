<script setup>

import { computed, onMounted, ref } from "vue";

const emit = defineEmits([
  "go"
]);

const props = defineProps({
  result: { type: Object },
  height: { type: Number },
  width: { type: Number },
  picked: { type: Boolean }
});

const CastleStyle = computed(() => {
  return {
    height: props.height + "px",
    width: props.width + "px"
  };
});

const BottomProportion = 0.6;
const BottomStyle = computed(() => {
  return {
    width: props.width * BottomProportion + "px"
  };
});

const Level = ref('');
const Title = ref('');

onMounted(() => {
  Level.value = props.result.team.name.slice(0, 2);
  Title.value = props.result.team.name.slice(3);
})

</script>

<template>
  <div
    :class="{
    'picked' : picked,
    'gryffindor' : result?.team?.building === 1,
    'slitherin' : result?.team?.building === 3,
  }"
    @click="emit('go', {id: result.team.id})"
    :style="CastleStyle"
    class="castle">

    <div
      class="team-label"
    >
      <b>{{Level}}</b> {{Title}}
    </div>

    <img alt="Top" class="Top" src="@/assets/Images/TowerTop.png">
    <div :style="BottomStyle" class="Bottom">
      {{result.team.totalResult}}
    </div>
  </div>
</template>

<style scoped>

.castle {
  display: flex;
  flex-direction: column;
  align-items: center;

  user-select: none;
  cursor: pointer;

  position: relative;
}

.Bottom {
  flex: 1;
  background-image: url("@/assets/textures/Wall.png");
  background-size: 32px 32px;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'HarryPotter', sans-serif;
  font-weight: 1000;
  letter-spacing: 1px;
  text-shadow: 0 0 10px black;

}

.Top {
  width: 100%;
}

.castle {
  margin: 0 16px;
  transition-duration: .5s;
}

.team-label {
  font-size: 16px;
  font-family: 'HarryPotter', sans-serif;
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 100%;
  z-index: 100;
  text-align: center;
}

.team-label > b {
  font-size: 24px;
}

.gryffindor > .team-label {
  color: gold;
}

.gryffindor > .team-label > b {
  color: #ff3b3b;
}

.slitherin > .team-label {
  color: #0fc70f;
}

.slitherin > .team-label > b {
  color: #ccc;
}

.gryffindor > .Bottom {
  color: gold;
}

.slitherin > .Bottom {
  color: #0fc70f;
}

@media screen and (min-width: 1300px){
  .team-label > b {
    font-size: 28px;
    margin-bottom: 4px;
  }
  .team-label {
    font-size: 20px;
    line-height: 20px;
  }
}

</style>