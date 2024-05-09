<template>
  <div>
    <div v-if="logIn">
      <form @submit.prevent="login(username, password)">
        <p>LOG IN TO YOUR SIGMA GRINDSET</p>
        <input type="username" placeholder="username" v-model="username" />
        <input type="password" placeholder="password" v-model="password" />
        <button type="submit">submit</button>
      </form>
      <button @click="createNew">Create a new account</button>
      <div v-if="failedLogin">
        <p>Failed to find your account. Please try again.</p>
      </div>
    </div>

    <form @submit.prevent="register(newusername, newpassword, name)" v-else>
      <p>BEGIN YOUR SIGMA GRINDSET</p>
      <input type="newusername" placeholder="username" v-model="newusername" />
      <input type="name" placeholder="name" v-model="name" />
      <input type="newpassword" placeholder="password" v-model="newpassword" />
      <button type="submit">submit</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const logIn = ref(true)
const username = ref('')
const newusername = ref('')
const password = ref('')
const newpassword = ref('')
const name = ref('')
const failedLogin = ref(false)

function createNew() {
  logIn.value = !logIn.value
}

async function login(username, password) {
  try {
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
    failedLogin.value = false
  } catch (error) {
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
}
</script>
