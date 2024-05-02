<script setup>
import NavBar from '../components/NavBar.vue'

</script>
<template>
    <NavBar/>
    <div class="left">
        <h2>NOTES</h2>
    </div>
</template>
<style scoped>
@font-face {
  font-family: comicSans;
  src: url(comicsans.ttf);
}
h2{
    text-align: center;
    padding: 1vw;
    font-family: comicSans;
    color: white;
}
.left{
    margin-top: 2vw;
    background-color: rgb(255, 255, 255);
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    height: 30vw;
    width: 20vw;
    border-radius: 3vw;
    margin: 3vw;
}
</style>