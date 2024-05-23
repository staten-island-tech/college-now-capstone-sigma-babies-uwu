<template>
    <div>
        <NavBar/>
        <img src="/cat.png"/>
    </div>
</template>
<script setup>
import NavBar from '../components/NavBar.vue'
</script>
<style scoped>
img{
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
    margin-top: 5vw;
    width: 30vw;
}
</style>