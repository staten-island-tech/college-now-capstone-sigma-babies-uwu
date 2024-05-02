<template>
  <form action="submit">
    <p>START YOUR SIGMA GRINDSET</p>
    <input type="username" placeholder="username" v-model="username" />
    <input type="password" placeholder="password" v-model="password" />
    <button @click="login">submit</button>
  </form>
</template>

<script>
import { ref } from 'vue'

const username = ref('')
const password = ref('')

async function login(username, password) {
  console.log(username, password)
  const res = await fetch('http://localhost:3000/login', {
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
}
</script>
