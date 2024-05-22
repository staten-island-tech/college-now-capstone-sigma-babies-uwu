import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useStore = defineStore('store', {
  state: () => ({
    loggedUser: ref(''),
    userNotes: ref([]),
    createView: ref(false),
    selectedNote: ref({}),
    allUsers: ref([])
  }),

  actions: {
    async filterNotes() {
      const res = await fetch('http://localhost:3000/note/get', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      let data = await res.json()
      // let filtered = data.filter((note) => {
      //   note.user = this.loggedUser
      // })
      this.userNotes.value = data
    },
    async getUsers() {
      const res = await fetch('http://localhost:3000/user/get', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      let data = await res.json()
      this.allUsers.value = data
    }
  }
})
