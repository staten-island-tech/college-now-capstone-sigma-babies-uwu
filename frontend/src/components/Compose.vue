<template>
    <div class="compose">
        <form action="" class="form">
            <div>
            <p>Title:</p>
            <input class="title"  type="text" >
            </div>
            <div>
                <p>Note:</p>
                <textarea class="note" type="text"> </textarea>
            </div>
        </form>
    </div>
</template>
<style scoped>
@font-face {
  font-family: comicSans;
  src: url(comicsans.ttf);
}
p{
    font-size: 1vw;
    color: rgb(219, 138, 138);
    text-decoration: underline;
    font-family: comicSans;
    
}
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
.form{
    margin-top: 3vw;
    margin-left: 1vw;
}
input{
    font-family: comicSans;
    background: white;
    border: none;
    padding: .1vw;
    vertical-align: top;
}
.note{
    border-radius: 1vw;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(219, 138, 138) 0px 0px 0px 1px inset;
    width: 90%;
    height: 17vw;
    font-family: comicSans;
    color: rgb(219, 138, 138);
    font-size: 1vw;
}
.note:active{
    border-color:rgb(219, 138, 138);;
}
.title{
    border-radius: .2vw;
}

</style>