<template>
  <div>
    <NavBar />
    <div class="maxxing">
      <div class="content">
        <h2 class="dailyQ header">Inspo Board</h2>
        <div class="images">
          <img src="/cat.png" />
          <img src="/mega.jpg" />
          <img src="/stare.jpg" />
        </div>
      </div>
      <div class="quote">
        <h2 class="dailyQ header">Today's Quote</h2>
        <h2 class="dailyQ">"{{ store.dailyQuote }}"</h2>
      </div>
      <div class="exercise">
        <h2 class="dailyQ header">Today's Exercise: {{ store.dailyExercise.name }}</h2>
        <h2 class="dailyQ">{{ store.dailyExercise.instructions }}</h2>
      </div>
    </div>
  </div>
</template>

<script setup>
import NavBar from '../components/NavBar.vue'
import { useStore } from '../stores/store'
import { onMounted } from 'vue'
const store = useStore()
onMounted(() => {
  store.getInspo(), store.getExercise()
})
</script>

<style scoped>
.maxxing {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin-top: 3rem;
}
.content {
  width: 40vw;

  background-color: rgb(255, 200, 200);
  border-radius: 2rem;
  padding: 2rem;
}
.images {
  justify-content: space-evenly;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
img {
  height: 15vw;
  /* margin-top: 1rem; */
  margin-bottom: 1rem;
}
.quote,
.exercise {
  width: 40vw;
  height: fit-content;
  border-radius: 2rem;
  background-color: rgb(255, 200, 200);
  padding: 2rem;
}
.dailyQ {
  font-size: 2rem;
  font-family: comicSans;
  text-align: center;
  font-weight: 100;
  color: rgb(219, 138, 138);
}
.header {
  font-weight: bold;
  text-align: center;
}
.exercise {
  width: 80vw;
  margin-top: 3rem;
}
</style>
