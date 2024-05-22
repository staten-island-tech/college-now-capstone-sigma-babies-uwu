<template>
  <div>
    <div v-if="logIn">
      <form @submit.prevent="login(username, password)">
        <p>LOG IN TO YOUR SIGMA GRINDSET</p>
        <input type="username" placeholder="username" v-model="username" required />
        <input type="password" placeholder="password" v-model="password" required />
        <button type="submit">submit</button>
      </form>
      <button @click="createNew">Create a new account</button>
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
  console.log(res)
  if (res.status != 400) {
    failedLogin.value = false
    store.loggedUser = username
    console.log(store.loggedUser)
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
  if (res.status != 400) {
    failedLogin.value = false
    router.push({ path: '/' })
    store.loggedUser = res.body
    console.log(store.loggedUser)
  } else {
    failedLogin.value = true
  }
}
</script>
