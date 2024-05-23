<script setup>
import { ref, onMounted } from 'vue'
import NavBar from '../components/NavBar.vue'
import { useStore } from '../stores/store'
import router from '../router/index'

const store = useStore()
let myNotes = ref([])
const title = ref('')
const note = ref('')

const showCompose = ref(false)
const showEdit = ref(false)
const selectedNote = ref({})
const titleEdit = ref('')
const noteEdit = ref('')

let shouldShowCloseButton = ref(false)
function selectNote(note) {
  shouldShowCloseButton.value = true
  selectedNote.value = note
  titleEdit.value = note.title
  noteEdit.value = note.note
  console.log(titleEdit.value)
}
function deselectNote() {
  selectedNote.value = {}
  titleEdit.value = ''
  noteEdit.value = ''
}
async function del() {
  if (confirm('ya sure?')) {
    let id = selectedNote.value
    console.log(id._id)
    let res = await fetch(`http://localhost:3000/note/delete/${id._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (res.status === 200) {
      selectedNote.value = {}
      getNotes()
    } else {
      console.log('oopsies')
    }
  }
}
async function getNotes() {
  const res = await fetch(`http://localhost:3000/note/get`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  if (!res.ok) {
    console.log(res)
  } else {
    const data = await res.json()
    myNotes.value = data.filter((note) => {
      return note.user === store.loggedUser.username
    })
    myNotes.value.reverse()
  }
  if (myNotes.value.length > 0) {
    shouldShowCloseButton.value = true
  } else {
    shouldShowCloseButton.value = false
  }
}
onMounted(() => {
  if (store.loggedUser === '') {
    router.push({ path: '/login' })
  } else {
    getNotes()
  }
})

function getTime() {
  const date = new Date()
  let day = date.getDate()
  let month = date.getMonth() + 1
  let year = date.getFullYear()
  let hour = date.getHours()
  let minute = date.getMinutes()
  let minuteTime
  if (minute < 10) {
    minuteTime = '0' + minute
  } else {
    minuteTime = minute
  }
  let dateString = `${month}/${day}/${year} ${hour}:${minuteTime}`
  return dateString
}

async function updateNote(noteid, title, note) {
  const res = await fetch(`http://localhost:3000/note/update/${noteid}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: title,
      note: note,
      user: store.loggedUser.username,
      date: getTime()
    })
  })
  console.log(noteid)
  if (res.ok) {
    showEdit.value = false
    const data = await res.json()
    selectNote(data)
    getNotes()
  } else {
    console.log(res)
  }
}

async function create(title, note) {
  const res = await fetch('http://localhost:3000/note/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: title,
      note: note,
      user: store.loggedUser.username,
      date: getTime()
    })
  })
  if (res.ok) {
    showCompose.value = false
    const data = await res.json()
    selectNote(data)
    getNotes()
    console.log(data)
  } else if (store.loggedUser === '') {
    router.push({ path: '/login' })
  } else {
    console.log('Error', res)
  }
}
</script>
<template>
  <div>
    <NavBar />
    <div>
      <div class="composeCom" v-if="showCompose">
        <button class="closeCom" @click="showCompose = !showCompose">×</button>
        <form action="" class="formCom" @submit.prevent="create(title, note)">
          <div>
            <p class="subTitleCom">Title:</p>
            <textarea
              class="titleCom"
              maxlength="40"
              type="text"
              placeholder="TITLE"
              v-model="title"
              required
            >
            </textarea>
          </div>
          <div>
            <p class="subTitleCom">Note:</p>
            <textarea class="noteCom" type="text" v-model="note" required> </textarea>
          </div>
          <button class="submitCom" type="submit">SUBMIT</button>
        </form>
      </div>
      <div class="composeCom" v-if="showEdit">
        <button class="closeCom" @click="showEdit = !showEdit">×</button>
        <form
          action=""
          class="formCom"
          @submit.prevent="updateNote(selectedNote['_id'], titleEdit, noteEdit)"
        >
          <div>
            <p class="subTitleCom">Title:</p>
            <textarea class="titleCom" maxlength="40" type="text" v-model="titleEdit" required>
            </textarea>
          </div>
          <div>
            <p class="subTitleCom">Note:</p>
            <textarea class="noteCom" type="text" v-model="noteEdit" required> </textarea>
          </div>
          <button class="submitCom" type="submit">SUBMIT</button>
        </form>
      </div>
    </div>
    <div class="con">
      <div class="leftCon">
        <div class="left" v-for="note in myNotes" :key="note.id" @click="selectNote(note)">
          <h2>{{ note.title }}</h2>
        </div>
      </div>
      <div class="right">
        <div class="noteCon">
          <button v-if="shouldShowCloseButton" class="close" @click="del()">Delete</button>
          <button v-if="shouldShowCloseButton" class="close" @click="deselectNote()">×</button>

          <h2 class="title">{{ selectedNote.title }}</h2>
          <h3 class="subTxt" id="date">{{ selectedNote.date }}</h3>
          <p class="subTxt">{{ selectedNote.note }}</p>
          <button v-if="selectedNote.title != ''" @click="showEdit = !showEdit" class="button-45">
            edit
          </button>
        </div>
      </div>
      <button v-if="!showCompose" @click="showCompose = !showCompose" class="button-45">+</button>
    </div>
  </div>
</template>
<style scoped>
@font-face {
  font-family: comicSans;
  src: url(comicsans.ttf);
}
.submitCom {
  margin-top: 1vw;
  background-color: rgb(255, 249, 249);
  box-shadow: rgb(250, 237, 244) 2.4px 2.4px 3.2px;
  border: none;
  padding: 0.5vw;
  font-family: comicSans;
  font-weight: bold;
  border-radius: 0.9vw;
  font-size: 0.8vw;
  color: rgb(219, 138, 138);
}
.submitCom:hover {
  cursor: pointer;
}
button:hover {
  cursor: pointer;
}
.closeCom {
  position: absolute;
  top: 1.5vw;
  right: 2vw;
  border: none;
  background: transparent;
  font-size: 2vw;
  color: rgb(219, 138, 138);
  -o-transition-duration: 1s;
  transition-duration: 0.2s;
}
.closeCom:hover {
  scale: 1.2;
}
.closeCom:active {
  transform: translateY(0.3vw);
}
.subTitleCom {
  font-size: 1vw;
  color: rgb(219, 138, 138);
  font-family: comicSans;
  font-weight: bold;
  padding: 0%;
}
.composeCom {
  height: 30vw;
  width: 25vw;
  background-color: rgb(255, 255, 255);
  box-shadow: rgb(219, 138, 138) 2.4px 2.4px 3.2px;
  position: absolute;
  border-radius: 2vw;
  bottom: 4vw;
  right: 2vw;
}
.formCom {
  margin-top: 3vw;
  margin-left: 1vw;
}
.noteCom {
  border-radius: 1vw;
  box-shadow: rgb(250, 237, 244) 2.4px 2.4px 3.2px;
  border: none;
  width: 85%;
  height: 12vw;
  font-family: comicSans;
  color: rgb(219, 138, 138);
  font-size: 1vw;
  padding: 1vw;
  background-color: rgb(255, 249, 249);
}
textarea:focus,
input:focus {
  outline: none;
}
textarea {
  resize: none;
}
.titleCom {
  border-radius: 0.5vw;
  width: 85%;
  height: 1.5vw;
  font-family: comicSans;
  color: rgb(219, 138, 138);
  font-size: 1vw;
  box-shadow: rgb(250, 237, 244) 2.4px 2.4px 3.2px;
  border: none;
  background-color: rgb(255, 249, 249);
}

.button-45 {
  position: absolute;
  right: 4vw;
  bottom: 4vw;
  align-items: center;
  background-color: rgb(255, 255, 255);
  background-position: 0 0;
  border: 1px solid rgb(255, 255, 255);
  border-radius: 11px;
  box-sizing: border-box;
  color: rgb(219, 138, 138);
  cursor: pointer;
  display: flex;
  font-size: 1rem;
  font-weight: 700;
  line-height: 33.4929px;
  list-style: outside url(https://www.smashingmagazine.com/images/bullet.svg) none;
  padding: 2px 12px;
  text-align: left;
  text-decoration: none;
  text-shadow: none;
  text-underline-offset: 1px;
  transition:
    border 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  word-break: break-word;
}

.button-45:active,
.button-45:hover,
.button-45:focus {
  outline: 0;
}

.button-45:active {
  background-color: rgb(219, 138, 138);
  box-shadow: rgba(0, 0, 0, 0.12) 0 1px 3px 0 inset;
  color: #ffffff;
}

.button-45:hover {
  background-color: #ffe3e3;
  border-color: #faa4a4;
}
.composeBtn {
  position: absolute;
  padding: 1vw;
  font-size: 2vw;
  right: 2vw;
  bottom: 2vw;
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
