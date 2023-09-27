<script setup>

import {useRouter} from "vue-router";

const router = useRouter()

function redirect(building) {
  router.push(`/menu/${building}`)
}
</script>

<template>
  <div class="menu-view">

    <h2 class="title text-burning">
      Межпредметная Олимпиада
    </h2>

    <div class="pick-building">
      <div class="cont">
        <div @click="redirect(1)" class="item gryffindor">
          <img alt="Гриффендор" class="faculty" src="../assets/Images/gryffindor.png">
          <div class="text-burning building-label">
            I
          </div>
        </div>
      </div>

      <div class="cont">
        <div @click="redirect(3)" class="item slitherin">
          <img alt="Слизерин" class="faculty" src="../assets/Images/slitherin.png">
          <div class="text-burning building-label">
            III
          </div>
        </div>
      </div>
    </div>


    <div @click="redirect(0)" class="all-buildings">
      <b class="all-results">
        Общий рейтинг
      </b>
    </div>
  </div>
</template>

<style scoped>
.title {
  color: var(--gold);
  font-family: 'HarryPotter', sans-serif;
  text-align: center;
}

.pick-building {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.cont {
  cursor: pointer;
}

.item {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.building-label {
  color: var(--gold);
  font-family: 'HarryPotter', sans-serif;
  position: absolute;
}

.all-buildings {
  display: flex;
  justify-content: center;
  align-items: center;
  color: cornflowerblue;
  cursor: pointer;

  font-family: 'HarryPotter', sans-serif;
  letter-spacing: -1px;
}

.all-results {
  font-weight: 500;
  background-color: #ececec;
  transition-duration: .5s;
}

.all-results:hover {
  box-shadow: 0 0 20px cornflowerblue;
}

.faculty {
  position: relative;
}

@media screen and (max-width: 600px) {
  .faculty {
    width: 150px;
    margin: 10px;
  }

  .all-results {
    border-radius: 8px;
    margin-top: 16px;
    padding: 12px 8px 8px;
  }

  .all-buildings {
    font-size: 48px;
    margin-top: 8px;
  }

  .building-label {
    font-size: 60px;
  }

  .title {
    letter-spacing: 2px;
    font-size: 64px;
    margin: 32px 0;
  }
}

@media screen and (min-width: 601px) {
  .faculty {
    width: 250px;
    margin: 10px;
  }

  .all-results {
    border-radius: 8px;
    margin-top: 24px;
    padding: 12px 8px 8px;
  }

  .all-buildings {
    font-size: 48px;
    margin-top: 8px;
  }

  .building-label {
    font-size: 60px;
  }

  .title {
    letter-spacing: 2px;
    font-size: 96px;
    margin: 32px 0;
  }

  .slitherin {
    margin-left: 12px;
  }

  .gryffindor {
    margin-right: 12px;
  }
}

@media screen and (min-width: 890px) {
  .pick-building {
    margin-top: 10vh;
  }
}

.gryffindor {
  transition-duration: .5s;
}

.slitherin {
  transition-duration: .5s;
}

.gryffindor:hover {
  box-shadow: 0 0 20px crimson;
}

.slitherin:hover {
  box-shadow: 0 0 20px green; /* Добавляем дельто-красную тень при наведении */
}
</style>