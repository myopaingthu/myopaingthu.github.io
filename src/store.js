import { createStore } from 'vuex'

// Read initial darkMode from localStorage, fallback to false
const savedDarkMode = localStorage.getItem('darkMode')
const initialDarkMode = savedDarkMode === null ? false : savedDarkMode === 'true'

export default createStore({
  state: {
    darkMode: initialDarkMode,
  },
  mutations: {
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode
      localStorage.setItem('darkMode', state.darkMode)
    },
    // Optional: allow setting directly (for future extensibility)
    setDarkMode(state, value) {
      state.darkMode = value
      localStorage.setItem('darkMode', value)
    },
  },
}) 