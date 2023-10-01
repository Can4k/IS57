<script setup>
const emit = defineEmits([
  'close_window'
])

const props = defineProps({
  result: {type: Object}
})

</script>

<template>
  <div class="modal-wrapper">
    <div class="statisitcs-window">
      <svg @click="emit('close_window')" viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none"
           stroke-linecap="round" stroke-linejoin="round" class="close-svg">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>

      <h3>Подробная статистика</h3>

      <div class="team-title">
        Название - <b>{{result?.team?.name}}</b>
      </div>

      <div class="team-title">
        Общий счет - <b>{{result?.team?.totalResult}}</b>
      </div>

      <div>
        <h4>По заданиям: </h4>
        <div class="result-block" v-for="result in result?.results ?? []">
          <div class="subject">
            {{result?.taskInfo?.subject.toUpperCase()}}
          </div>

          <div class="name">
            {{result?.taskInfo?.name}} -
            <span class="result">
            {{result?.result}}
          </span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.modal-wrapper {
  z-index: 1000;
  background-color: #282832;
  color: white;
}

@media screen and (max-width: 600px) {
  .modal-wrapper {
    position: fixed;
    left: 0;
    top: 0;

    width: 100vw;
    height: var(--app-height);
  }

}

@media screen and (min-width: 601px) {
  .modal-wrapper {
    position: fixed;
    left: 0;
    top: 0;

    width: 100vw;
    height: var(--app-height);

    background-color: rgba(0, 0, 28, 0.15);
    backdrop-filter: blur(4px);
  }

  .statisitcs-window {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: #282832;

    width: 600px;
    min-height: 400px;
    max-height: 400px;
    overflow-y: auto;

    border-radius: 8px;
  }

  .statisitcs-window::-webkit-scrollbar {
    width: 0;
  }
}

.close-svg {
  position: absolute;
  right: 16px;
  top: 16px;
  cursor: pointer;
}

.statisitcs-window {
  padding: 16px;
  position: relative;
}

h3 {
  font-family: 'HarryPotter', sans-serif;
  font-weight: normal;
  font-size: 36px;
  line-height: 28px;
  margin: 0 32px 16px 0;
}

.team-title {
  font-family: 'HarryPotter', sans-serif;
  font-size: 20px;
}

.team-title > b {
  font-weight: normal;
  color: #cccccc;
}

h4 {
  margin-top: 16px;
  margin-bottom: 8px;
  font-size: 36px;
  font-weight: normal;
  font-family: 'HarryPotter', sans-serif;
}

.result-block {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  margin-bottom: 12px;
}

.subject {
  border: 1px solid white;
  border-radius: 6px;
  display: inline-flex;
  padding: 2px 4px;
  font-family: 'HarryPotter', sans-serif;
  font-size: 12px;
}
.name {
  margin-top: 4px;
  font-family: 'HarryPotter', sans-serif;
  color: #cccccc;
}
</style>