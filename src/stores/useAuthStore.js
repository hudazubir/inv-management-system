import { ref } from 'vue'
import { defineStore } from 'pinia'

import { api, getToken, setToken } from '@/services/api'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const profile = ref(null)
  const isLoading = ref(false)
  const isInitialized = ref(false)

  function setUser(nextUser) {
    user.value = nextUser
    profile.value = nextUser
      ? { id: nextUser.id, full_name: nextUser.full_name, role: nextUser.role }
      : null
  }

  async function initialize() {
    if (isInitialized.value) return

    isLoading.value = true

    try {
      if (getToken()) {
        const { data } = await api.get('/me')

        setUser(data)
      }
    } catch (error) {
      // Expired token or unreachable server: start signed out instead of
      // blocking the app from rendering.
      console.error(error)
      setToken(null)
      setUser(null)
    } finally {
      isInitialized.value = true
      isLoading.value = false
    }
  }

  async function signIn(email, password) {
    isLoading.value = true

    try {
      const data = await api.post('/login', { email, password })

      setToken(data.token)
      setUser(data.user)

      return data
    } finally {
      isLoading.value = false
    }
  }

  async function signOut() {
    isLoading.value = true

    try {
      await api.post('/logout').catch(console.error)
    } finally {
      setToken(null)
      setUser(null)
      isLoading.value = false
    }
  }

  async function sendPasswordReset(email) {
    await api.post('/forgot-password', { email })
  }

  async function resetPassword({ token, email, password, passwordConfirmation }) {
    await api.post('/reset-password', {
      token,
      email,
      password,
      password_confirmation: passwordConfirmation,
    })
  }

  return {
    user,
    profile,
    isLoading,
    isInitialized,
    initialize,
    signIn,
    signOut,
    sendPasswordReset,
    resetPassword,
  }
})
