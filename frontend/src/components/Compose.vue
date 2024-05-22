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
  console.log(res, store.loggedUser)
  if (res.status != 500) {
    console.log(dateString)
  } else {
    console.log('wtflip')
  }
}
</script>

<template>
    <div class="compose">
        <button class="close">×</button>
        <form action="" class="form" @submit.prevent="create(title, body)">
            <div>
            <p>Title:</p>
            <textarea class="title" maxlength="40" type="text" placeholder="TITLE"  required > </textarea>
            </div>
            <div>
                <p>Note:</p>
                <textarea class="note" type="text"  v-model="note" required > </textarea>
            </div>
            <button class="submit" type="submit">SUBMIT</button>
        </form>
    </div>
</template>
<style scoped>
@font-face {
  font-family: comicSans;
  src: url(comicsans.ttf);
}
.submit{
  margin-top: 1vw;
  background-color: rgb(255, 249, 249);
  box-shadow: rgb(250, 237, 244) 2.4px 2.4px 3.2px;
    border: none;
    padding: .5vw;
    font-family: comicSans;
    font-weight: bold;
    border-radius: .9vw;
    font-size: .8vw;
    color: rgb(219, 138, 138);
}
.close{
    position: absolute;
    top: 1.5vw;
    right: 2vw;
    border: none;
    background: transparent;
    font-size: 2vw;
    color: rgb(219, 138, 138);
    -o-transition-duration: 1s;
    transition-duration: .2s;
}
.close:hover{
    scale: 1.2;
}
.close:active{
    transform: translateY(.3vw);
}
p{
    font-size: 1vw;
    color: rgb(219, 138, 138);
    font-family: comicSans;
    font-weight: bold;
    
}
.compose{
    height: 30vw;
    width: 25vw;
    background-color: rgb(255, 255, 255);
    box-shadow: rgb(219, 138, 138) 2.4px 2.4px 3.2px;
    position: absolute;
    border-radius: 2vw;
    bottom: 4vw;
    right: 2vw;
}
.form{
    margin-top: 3vw;
    margin-left: 1vw;
}
.note{
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
textarea:focus, input:focus{
    outline: none;
}
textarea{
    resize: none;
}
.title{
    border-radius: .5vw;
    width: 85%;
    height: 1.5vw;
    font-family: comicSans;
    color: rgb(219, 138, 138);
    font-size: 1vw;
    box-shadow: rgb(250, 237, 244) 2.4px 2.4px 3.2px;
    border: none;
    background-color: rgb(255, 249, 249);
}

</style>
