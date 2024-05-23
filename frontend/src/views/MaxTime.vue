<template>
  <div>
    <NavBar />
    <div class="content">
      <img src="/cat.png" />
      <img src="/mega.jpg" />
      <img src="/stare.jpg" />
    </div>
  </div>
</template>
<script setup>
import NavBar from '../components/NavBar.vue'
</script>
<style scoped>
.content {
  width: 99vw;
  margin-top: 3rem;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
img {
  width: 20vw;
  height: auto;
}
</style>
