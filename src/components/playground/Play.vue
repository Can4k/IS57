<script setup>
import {computed, defineAsyncComponent, onMounted, ref, watch} from "vue";

import {useWindowSize} from '@vueuse/core'
import {useElementSize} from '@vueuse/core'


const Castle = defineAsyncComponent(() => import("@/components/playground/Castle.vue"));

const props = defineProps({
  results: {type: Object},
})

const emit = defineEmits([
  'ready'
])

const loaded = ref(false)

function BuildPlayground() {
  if (!props.results) {
    return
  }

  onReady();
}

function onReady() {
  emit('ready');
  loaded.value = true;
}

onMounted(() => BuildPlayground());
watch(() => props.results, () => BuildPlayground());

const PlayRef = ref(null)

const {height} = useWindowSize()
const {width} = useElementSize(PlayRef)

const PlayProportion = .45
const MaximalHeightProportion = .8;
const MaximalWidthProportion = .2;

const MinimalHeight = 100;
const MinimalWidth = 50;

const MaximalWidth = 700;

const PlayHeight = computed(() => height.value * PlayProportion);

const PlayStyle = computed(() => {
  return {
    height: PlayHeight.value + 'px'
  }
})


const CastlesStyle = computed(() => {
  return {
    transform: `translateX(${TranslateX.value}px) translateY(${TranslateY.value}px)`,
  }
})

const MountainsStyle = computed(() => {
  return {
    backgroundPositionX: `${MountainsTranslateX.value}` + 'px',
  }
})

const MountainsTranslateX = ref(0)
const TranslateX = ref(100);
const TranslateY = ref(0);
const PrevId = ref(-1);

function go(params) {
  const {id} = params;

  let DeltaX = 0, prev_pos = -100, cur_pos = 0;

  for (const block in props.results.List) {
    if (props.results.List[block].team.id === PrevId.value) {
      prev_pos = DeltaX;
    }

    if (props.results.List[block].team.id === id) {
      cur_pos = DeltaX;
    }

    DeltaX += Math.max(MinimalWidth,
        Math.min(width.value, MaximalWidth) * MaximalWidthProportion * (props.results.List[block].team.totalResult / props.results.MaxResult)
    ) + 32;
  }

  PrevId.value = id;
  TranslateX.value -= cur_pos - prev_pos;
  MountainsTranslateX.value -= (cur_pos - prev_pos);
}

onMounted(() => {
  TranslateY.value = height.value;
  setTimeout(() => {
    TranslateY.value = 0;
  }, 500)
})

</script>

<template>
  <div ref="PlayRef" class="Play" :style="PlayStyle" v-if="loaded">
    <div :style="MountainsStyle" class="Mountains">

    </div>



    <div :style="CastlesStyle" class="Castles">
      <Castle
          :result="result"

          :height="Math.max(
              MinimalHeight,
              PlayHeight * MaximalHeightProportion * (result.team.totalResult / props.results.MaxResult)
          )"

          :width="Math.max(
              MinimalWidth,
              Math.min(width, MaximalWidth) * MaximalWidthProportion * (result.team.totalResult / props.results.MaxResult)
          )"

          v-for="result in results?.List"
          :key="result"

          @go="go"
      />
    </div>
  </div>
</template>

<style scoped>
.Play {
  background-color: #00001c;

  overflow: hidden;

  border-radius: 8px;

  position: relative;

  padding: 0 16px;

  flex-shrink: 0;
}

.Castles {
  display: flex;
  align-items: flex-end;
  flex-wrap: nowrap;

  position: absolute;
  bottom: 0;

  padding-left: calc(50% - 100px);

  transition-duration: .5s;
}

.Mountains {
  position: absolute;
  left: 0;
  bottom: 0;
  height: 300px;
  width: 100%;

  background-image: url("@/assets/Images/Mountains2.png");
  transition-duration: .5s;
}
</style>