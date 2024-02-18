<script setup>
import { defineAsyncComponent, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import Statistics from "@/components/statistics/Statistics.vue";
import { watchOnce } from "@vueuse/core";
import StatisticsWindow from "@/components/modals/StatisticsWindow.vue";

const Play = defineAsyncComponent(() => import("@/components/playground/Play.vue"));

const store = useStore();

const loaded = ref(false);

const results = ref(null);

onMounted(async () => {
  document.title = 'Межпредметная олимпиада - 2023'

  const link = document.querySelector("link[rel~='icon']");
  link.href = './potter-icon.png';

  await GetResults();
});

async function GetResults() {
  store.commit("LoaderModule/increment");

  const verdict = await store.dispatch("GetResults");
  if (!verdict) {
    alert("Результаты не могут быть получены");
    return;
  }

  results.value = verdict;

  store.commit("LoaderModule/decrement");
}

function onPlayReady() {
  loaded.value = true;
}

const PickedResult = ref(null);
const PickedTeamId = ref(-1);
const IsPlayStartPosition = ref(false);

watchOnce(() => PickedTeamId.value, () => {
  setTimeout(() => IsPlayStartPosition.value = true, 500);
});


watch(() => PickedTeamId.value, () => {
  PickedResult.value = null;

  const NewResult = results.value.List.find(res => res.team.id === PickedTeamId.value);

  setTimeout(() => {
    if (PickedTeamId.value === NewResult.team.id) {
      PickedResult.value = NewResult;
    }
  }, 500);
});

const ShowAllStat = ref(false);

function InitShowAllStat() {
  ShowAllStat.value = true;
}
</script>

<template>
  <div v-show="loaded" class="play-view">

    <transition>
      <StatisticsWindow
        @close_window="ShowAllStat = false"
        v-show="ShowAllStat"
        :result="PickedResult"
      />
    </transition>

    <h2 class="title text-burning">
      Межпредметная Олимпиада
    </h2>

    <div :class="[PickedTeamId === -1 ? 'play-center' : 'play-top']" class="play-container">
      <transition>
        <div v-show="PickedTeamId === -1" class="fly-manual">
          ЛЕТИ К ИНТЕРЕСУЮЩЕЙ БАШНЕ
        </div>
      </transition>

      <Play
        v-model="PickedTeamId"
        @ready="onPlayReady"
        :results="results"
      />

      <transition name="fade-without-leave">
        <Statistics
          @show_all_stat="InitShowAllStat"
          :result="PickedResult"
          v-show="IsPlayStartPosition && PickedResult"
        />
      </transition>
    </div>
  </div>
</template>

<style scoped>

.play-container {
  position: relative;
  transition-duration: .5s;
}

.fly-manual {
  font-size: 12px;
  font-family: 'HarryPotter', sans-serif;
  color: rgba(255, 255, 255, 0.4);
  text-shadow: 0 0 10px;
  text-align: center;

  position: absolute;
  z-index: 20;

  top: 8px;
  left: 50%;
  transform: translateX(-50%);
}

.Play {
  margin-bottom: 16px;
}

.title {
  font-weight: 500;
  color: var(--gold);
  font-family: 'HarryPotter', sans-serif;
  text-align: center;
}

@media screen and (max-width: 600px) {
  .title {
    letter-spacing: 0;
    font-size: 38px;
    margin: 24px 0;
  }
}

@media screen and (min-width: 601px) {
  .title {
    letter-spacing: -1px;
    font-size: 64px;
    margin: 36px 0;
  }
}

@media screen and (min-height: 700px){
  .play-container {
    margin-top: 120px;
  }
}
</style>