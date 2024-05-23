<script setup>
import { ref } from 'vue'
import { useStore } from '@/stores/store'
import router from '../router/index'
const store = useStore()
const title = ref('')
const note = ref('')

async function addToNotes(userid, note) {
  const res = await fetch(`http://localhost:3000/user/update/${userid}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      notes: [{ note }]
    })
  })
}

async function create(titleV, noteV) {
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

  const res = await fetch('http://localhost:3000/note/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: titleV,
      note: noteV,
      date: dateString,
      user: store.loggedUser
    })
  })

  console.log(res, store.loggedUser)
  if (res.status != 500) {
    store.createView = false
    store.loggedUser.notes
  } else if (store.loggedUser === '') {
    router.push({ path: '/login' })
  } else {
    console.log('Error')
  }
}
</script>

<template>
  <div class="compose">
    <form @submit.prevent="create(title, note)">
      <input type="text" placeholder="TITLE" v-model="title" required />
      <input type="text" placeholder="NOTE" v-model="note" required />
      <button type="submit">submit</button>
    </form>
  </div>
</template>
<style setup>
.compose {
  height: 30vw;
  width: 25vw;
  background-color: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
  position: absolute;
  border-radius: 2vw;
  bottom: 4vw;
  right: 2vw;
}
input {
  display: block;
}
</style>
