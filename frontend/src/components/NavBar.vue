<template>
    <div id="nav">
      <div class="wrapper">
        <RouterLink to="/" class="headertext1">GRIND</RouterLink>
        <RouterLink to="/max" class="headertext1">MAX</RouterLink>
      </div>
    </div>
</template>
<style scoped>
@font-face {
  font-family: comicSans;
  src: url(comicsans.ttf);
}
#nav {
line-height: 1.5;
top:0%;
display: flex;
justify-content: center;
padding: 2vw;

}
.headertext1{
text-decoration: none;
color: rgb(255, 182, 194);
font-family: comicSans;
font-size: 1.3vw;
font-weight: bolder;
}
.headertext1:hover{
  color: rgb(219, 138, 138);
}
.wrapper a.router-link-exact-active {
color: rgb(219, 138, 138);
text-decoration: underline;
}
.wrapper a {
padding: 0 1rem;
} 
</style>