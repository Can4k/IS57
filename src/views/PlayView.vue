<script setup>
import {defineAsyncComponent, onMounted, ref} from "vue";
import {useStore} from "vuex";

const Play = defineAsyncComponent(() => import("@/components/playground/Play.vue"));

const store = useStore()

const loaded = ref(false)

const results = ref(null);

onMounted(async () => {
  await GetResults();
})

async function GetResults() {
  store.commit('LoaderModule/increment');

  const verdict = await store.dispatch('GetResults');
  if (!verdict) {
    alert('Результаты не могут быть получены');
    return
  }

  results.value = verdict;

  store.commit('LoaderModule/decrement');
}

function onPlayReady() {
  loaded.value = true;
}

</script>

<template>
  <div v-show="loaded" class="play-view">
    <Play
        @ready="onPlayReady"
        :results="results"
    />
  </div>
</template>

<style scoped>
.play-view {

}
</style>