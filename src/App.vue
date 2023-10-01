<script setup>
import { onMounted, ref, watch } from "vue";
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import Loader from "@/components/Loader.vue";
import { useWindowSize } from "@vueuse/core";

const router = useRouter()
const store = useStore()

const {width, height} = useWindowSize()
onMounted(() => {
  document.documentElement.style.setProperty('--app-height', height.value + 'px');
  watch(() => height.value, () => {
    document.documentElement.style.setProperty('--app-height', height.value + 'px');
  })
})

const ShowRouter = ref(false);
onMounted(async () => {
  store.commit('LoaderModule/increment');

  await store.dispatch("GetStartDate");

   if (store.state.StartDate <= Date.now()) {
     await router.push('/menu')
   } else {
     await router.push('/')
   }

  store.commit('LoaderModule/decrement');
  ShowRouter.value = true;
});

</script>

<template>
  <transition>
    <div v-if="ShowRouter" class="app-wrapper">
      <router-view v-slot="{ Component }">
        <transition mode="out-in">
          <component :is="Component"/>
        </transition>
      </router-view>

      <img class="signature" src="@/assets/Images/USUS.png" alt="Сделано учениками 11И класса">
    </div>
  </transition>
  <transition>
    <Loader v-show="store.state.LoaderModule.ShowLoader"/>
  </transition>
</template>

/* GLOBAL STYLE */
<style>
* {
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
}

@font-face {
  font-family: 'HarryPotter';
  src: url('@/assets/fonts/3840-font.ttf');
  font-weight: 500;
}

* {
  --background: #00001c;
  --gold: gold;
  --parchment: #00001c;
}

.text-burning {
  animation: 2s text-burn ease-in infinite;
}

@keyframes text-burn {
  0% {
    text-shadow: 0 0 6px rgba(255, 215, 0, 0.50);
  }
  50% {
    text-shadow: 0 0 12px rgba(255, 215, 0, 0.50);
  }
  100% {
    text-shadow: 0 0 6px rgba(255, 215, 0, 0.50);
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.fade-without-leave-leave-from {
  opacity: 0;
}

.fade-without-leave-enter-active,
.fade-without-leave-leave-active {
  transition: opacity 0.5s ease;
}

.fade-without-leave-enter-from,
.fade-without-leave-leave-to {
  opacity: 0;
}

/*@keyframes lightning {
  0% {
    background-color: var(--background);
  }

  8% {
    background-color: var(--background);
  }
  10% {
    background-color: #eee;
  }
  12% {
    background-color: var(--background);
  }

  60% {
    background-color: var(--background);
  }
  62% {
    background-color: #eee;
  }
  64% {
    background-color: var(--background);
  }
  100% {
    background-color: var(--background);
  }
}*/

.signature {
  position: fixed;
  bottom: 36px;
  left: 50%;
  transform: translateX(-50%);
  opacity: 1;
  z-index: -100;
  background-color: rgba(230, 230, 250, 0.1);
  padding: 12px;
  border-radius: 14px;
}
</style>


<style>
body {
  background-color: var(--background);
}
</style>