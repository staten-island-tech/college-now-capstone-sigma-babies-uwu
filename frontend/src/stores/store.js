import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useStore = defineStore('store', {
  state: () => ({
    loggedUser: ref(''),
    dailyExercise: ref({}),
    dailyQuote: ref('')
  }),

  actions: {
    async getInspo() {
      const res = await fetch('https://api.api-ninjas.com/v1/quotes', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Api-Key': 'Ue+uGnI0/eRuj54SfYFtJw==FcgdXFMr6vzy8xMU'
        }
      })
      let data = await res.json()
      this.dailyQuote = data[0].quote
      console.log(data)
    },
    async getExercise() {
      const res = await fetch('https://api.api-ninjas.com/v1/exercises', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Api-Key': 'Ue+uGnI0/eRuj54SfYFtJw==FcgdXFMr6vzy8xMU'
        }
      })
      let index = Math.floor(Math.random() * 9)
      let data = await res.json()

      this.dailyExercise = data[index]
      console.log(data[index], index)
    }
  }
})
