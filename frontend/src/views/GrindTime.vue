<script setup>
import { ref, onMounted } from 'vue'
import NavBar from '../components/NavBar.vue'
import Compose from '../components/Compose.vue'
let notes = ref([])
const selectedNote = ref({})
// async function getNote() {
//   let res = await fetch('http://localhost:3000/note/get', {
//     method: 'GET',
//     headers: { 'Content-Type': 'application/json' }
//   })
//   let data = await res.json()
//   notes.value = data
//   console.log(notes.value)
// }
// getNote()
function selectNote(note) {
  selectedNote.value = note
}
</script>
<template>
  <div>
    <NavBar />
    <Compose />
    <div class="con">
      <div class="leftCon">
        <div class="left" v-for="note in notes" :key="note.id" @click="selectNote(note)">
          <h2>{{ note.title }}</h2>
        </div>
      </div>
      <div class="right">
        <div class="noteCon">
          <button class="close">×</button>
          <h2 class="title">{{ selectedNote.title }}</h2>
          <h3 class="subTxt" id="date">{{ selectedNote.date }}</h3>
          <p class="subTxt">{{ selectedNote.note }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
@font-face {
  font-family: comicSans;
  src: url(comicsans.ttf);
}
.close {
  position: absolute;
  right: 15vw;
  border: none;
  background: transparent;
  font-size: 2vw;
  color: rgb(219, 138, 138);
  -o-transition-duration: 1s;
  transition-duration: 0.2s;
}
.close:hover {
  scale: 1.2;
}
.close:active {
  transform: translateY(0.3vw);
}
#date {
  margin-bottom: 2vw;
}
.noteCon {
  padding: 2vw;
}
.title {
  padding: 0;
}
.noteDisplay {
  width: 60vw;
}
.subTxt {
  margin: 0;
  padding: 0%;
}
h2 {
  text-align: left;
  padding: 1vw;
  font-family: comicSans;
  color: rgb(219, 138, 138);
  font-size: 1.2vw;
}
h3 {
  text-align: left;
  padding: 1vw;
  font-family: comicSans;
  color: rgb(219, 138, 138);
  font-size: 1.1vw;
}
p {
  text-align: left;
  padding: 1vw;
  font-family: comicSans;
  color: rgb(219, 138, 138);
  font-size: 1vw;
}
.left {
  margin-top: 2vw;
  background-color: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  width: 20vw;
  border-radius: 3vw;
  margin: 3vw;
}
.left:active {
  transform: translateY(0.3vw);
}
.left:hover {
  cursor: pointer;
}
.right {
  width: 50vw;
  border-radius: 3vw;
  background-color: rgb(255, 255, 255);
  height: 70vh;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
}
.leftCon {
  height: 70vh;
  overflow-y: scroll;
  margin-right: 1vw;
}
.con {
  display: flex;
  justify-content: center;
  margin-top: 3vw;
}
/* width */
::-webkit-scrollbar {
  width: 10px;
  border-radius: 3vw;
}

/* Track */
::-webkit-scrollbar-track {
  background: #ffdcdc;
  border-radius: 3vw;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(255, 182, 194);
  border-radius: 3vw;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgb(219, 138, 138);
  cursor: pointer;
}
</style>
