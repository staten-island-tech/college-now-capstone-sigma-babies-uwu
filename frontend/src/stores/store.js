import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useStore = defineStore('store', {
  state: () => ({ loggedUser: ref(''), userNotes: ref([]) }),
  actions: {
    async filterNotes() {
      const res = await fetch('http://localhost:3000/note/get', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      let data = await res.json()
      let filtered = data.filter((note) => {
        note.user = this.loggedUser
      })
      this.userNotes.value = filtered
    }
  }
})
