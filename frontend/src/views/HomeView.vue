<script setup>
</script>

<template>
  <div class="con">
    <img class="logo" src="/BuffSeagull.png" alt="Buff Seagull Logo">
    <div>
      <h1 class="title">SEAGULL MAXXING</h1>
      <div>
        <input type="text">
        <input type="text">
      </div>
    </div>
  </div>
</template>
<style scoped>
@font-face {
  font-family: comicSans;
  src: url(comicsans.ttf);
}
.con{
  margin-left: auto;
  margin-right: auto;
  width: 75vw;
  display: flex;
  justify-content: center;
  margin-top: 10vw;
}
.title{
  width: fit-content;
  display: inline;
  text-align: center;
  font-family: comicSans;
  height: 20vw;
}
.logo{
  width: 20vw;
  height: 20vw;
}
</style>
