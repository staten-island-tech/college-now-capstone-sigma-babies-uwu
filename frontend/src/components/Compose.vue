<script setup>
import { ref } from 'vue'
import { useStore } from '@/stores/store'

const store = useStore()
const title = ref('')
const note = ref('')

async function create(title, note) {
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
      title: title,
      note: note,
      date: dateString,
      user: store.loggedUser
    })
  })
  console.log(res)
  if (res.status != 400) {
    console.log(dateString)
  } else {
    console.log('wtflip')
  }
}
</script>

<template>
  <div class="compose">
    <form @submit.prevent="create(title, body)">
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
