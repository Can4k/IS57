<script setup>
import { useStore } from "vuex";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useStore();

const Timer = ref("");

onMounted(() => {
  CalculateStart();
  setInterval(() => CalculateStart(), 1000);
});

function CalculateStart() {
  let TimeToStart = new Date(store.state.StartDate).getTime() - Date.now();

  if (TimeToStart <= 0) {
    return router.push("/menu");
  }

  TimeToStart = Math.floor(TimeToStart / 1000);

  let TimerValue = "";
  let hours = Math.floor(TimeToStart / 3600);
  if (hours === 0) {
    TimerValue = "00";
  } else if (hours < 10) {
    TimerValue += "0" + hours;
  } else {
    TimerValue += hours;
  }

  TimerValue += ":";
  TimeToStart %= 3600;
  let minutes = Math.floor(TimeToStart / 60);
  if (minutes === 0) {
    TimerValue += "00";
  } else if (minutes < 10) {
    TimerValue += "0" + minutes;
  } else {
    TimerValue += minutes;
  }

  TimerValue += ":";
  TimeToStart %= 60;
  if (TimeToStart === 0) {
    TimerValue += "00";
  } else if (TimeToStart < 10) {
    TimerValue += "0" + TimeToStart;
  } else {
    TimerValue += TimeToStart;
  }

  Timer.value = TimerValue;
}

</script>

<template>
  <div class="timer-page">
    <div class="timer text-burning">
      <div>
        <img class="potter-flying" alt="Гарри Поттер" src="@/assets/Images/Potter2.png" />
      </div>
      {{ Timer }}
    </div>
  </div>
</template>

<style scoped>
.timer-page {
  user-select: none;
}

.timer {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: var(--gold);

  font-family: 'HarryPotter', sans-serif;
  letter-spacing: 2px;
  text-align: center;
  font-size: 50px;

  width: 100%;
}

.potter-flying {
  width: 192px;

  transform-origin: center center;
  animation: 4s potter-animation ease-in-out infinite;
}

@keyframes potter-animation {
  0% {
    transform: rotate(0);
  }

  50% {
    transform: translateY(-50px) rotate(-15deg);
  }
}
</style>
