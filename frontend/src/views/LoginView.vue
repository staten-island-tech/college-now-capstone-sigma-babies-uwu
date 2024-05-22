<template>
  <div id="con">
    <div v-if="logIn">
      <form @submit.prevent="login(username, password)">
        <p>LOG IN TO YOUR SIGMA GRINDSET</p>
        <input type="username" placeholder="username" v-model="username" required />
        <input type="password" placeholder="password" v-model="password" required />
        <button type="submit">Login</button>
        <button @click="createNew">Sign Up</button>
      </form>
      <div v-if="failedLogin">
        <p>Failed to find your account. Please try again.</p>
      </div>
    </div>

    <form @submit.prevent="register(newusername, newpassword, name)" v-else>
      <p>BEGIN YOUR SIGMA GRINDSET</p>
      <input type="newusername" placeholder="username" v-model="newusername" required />
      <input type="name" placeholder="name" v-model="name" required />
      <input type="newpassword" placeholder="password" v-model="newpassword" required />
      <button type="submit">submit</button>
      <div v-if="failedLogin">
        <p>Username unavailable. Please submit another.</p>
      </div>
    </form>
  </div>
</template>
<style scoped>
@font-face {
  font-family: comicSans;
  src: url(comicsans.ttf);
}
input{
  display: block;
  background-color: #ffffff;
  border: none;
  padding: 1rem;
  font-family: comicSans;
  font-size: 1rem;
  width: 90%;
  border-radius: 1rem;
  color: lightcoral;
  box-shadow: 0 0.4rem #dfd9d9;
  cursor: pointer;
  margin-bottom: 1vw;
}
button{
  color: lightcoral;
  background-color: #ffffff;
  font-family: comicSans;
  display: inline;
  width: 40%;
  border-radius: 2vw;
  cursor: pointer;
  user-select: none;
  margin-right: 1vw;
  -webkit-user-select: none;
  touch-action: manipulation;
  font-size: 1rem;
  font-weight: 700;
  height: 56px;
  justify-content: center;
  align-items: center;
  display: inline;
  overflow-wrap: break-word;
  border: 0 solid #E2E8F0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  box-sizing: border-box;
  padding: 1vw;
  text-decoration: none;
}
button:hover{
  color: #ffffff;
  background-color: rgb(219, 138, 138);
}
#con{
  position: absolute;
  left: 50%;
    transform: translate(-50%, 0);
    top: 35%;
}
p{
  text-align: center;
  font-family: comicSans;
    font-weight: bold;
    color: rgb(219, 138, 138);
    font-size: 1vw;
}
</style>

<script setup>
import { ref } from 'vue'
import router from '../router/index'
import { useStore } from '@/stores/store'

const store = useStore()
const logIn = ref(true)
const username = ref('')
const newusername = ref('')
const password = ref('')
const newpassword = ref('')
const name = ref('')
const failedLogin = ref(false)

function createNew() {
  logIn.value = !logIn.value
  failedLogin.value = false
}

import { onMounted } from 'vue'
onMounted(() => {
  store.getUsers()
})

async function login(username, password) {
  console.log(username, password)
  const res = await fetch('http://localhost:3000/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username.toLowerCase(),
      password: password
    })
  })

  if (res.ok) {
    const data = await res.json()
    store.loggedUser = data.user
    failedLogin.value = false
    router.push({ path: '/' })
  } else {
    failedLogin.value = true
  }
}

async function register(username, password, name) {
  console.log(username, name, password)
  const res = await fetch('http://localhost:3000/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username.toLowerCase(),
      password: password,
      name: name
    })
  })
  console.log(res)
  if (res.ok) {
    failedLogin.value = false
    router.push({ path: '/' })
    const data = await res.json()
    store.loggedUser = data.user
  } else {
    failedLogin.value = true
  }
}
</script>
