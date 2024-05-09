<template>
    <div class="compose">
        <form action="">
            <input type="text" placeholder="TITLE">
            <input type="text" placeholder="NOTE">
        </form>
    </div>
</template>
<style setup>
.compose{
    height: 30vw;
    width: 25vw;
    background-color: rgb(255, 255, 255);
    box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
    position: absolute;
    border-radius: 2vw;
    bottom: 4vw;
    right: 2vw;
}
input{
    display: block;
}
</style>