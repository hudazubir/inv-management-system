import { ref } from 'vue'
import { defineStore } from 'pinia'

import { supabase } from '@/services/supabase'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const session = ref(null)
  const profile = ref(null)
  const isLoading = ref(false)
  const isInitialized = ref(false)

  async function fetchProfile() {
    if (!user.value) {
      profile.value = null
      return
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('id, full_name, role')
      .eq('id', user.value.id)
      .single()

    if (error) throw error

    profile.value = data
  }

  async function initialize() {
    if (isInitialized.value) return

    isLoading.value = true

    try {
      const {
        data: { session: currentSession },
        error,
      } = await supabase.auth.getSession()

      if (error) throw error

      session.value = currentSession
      user.value = currentSession?.user ?? null

      if (user.value) {
        await fetchProfile()
      }

      supabase.auth.onAuthStateChange((_event, nextSession) => {
        session.value = nextSession
        user.value = nextSession?.user ?? null

        if (user.value) {
          setTimeout(() => {
            fetchProfile().catch(console.error)
          }, 0)
        } else {
          profile.value = null
        }
      })

      isInitialized.value = true
    } finally {
      isLoading.value = false
    }
  }

  async function signIn(email, password) {
    isLoading.value = true

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      session.value = data.session
      user.value = data.user

      await fetchProfile()

      return data
    } finally {
      isLoading.value = false
    }
  }

  async function signOut() {
    isLoading.value = true

    try {
      const { error } = await supabase.auth.signOut()

      if (error) throw error

      session.value = null
      user.value = null
      profile.value = null
    } finally {
      isLoading.value = false
    }
  }

  async function sendPasswordReset(email) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })

    if (error) throw error
  }

  async function updatePassword(password) {
    const { error } = await supabase.auth.updateUser({
      password,
    })

    if (error) throw error
  }

  return {
    user,
    session,
    profile,
    isLoading,
    isInitialized,
    initialize,
    signIn,
    signOut,
    sendPasswordReset,
    updatePassword,
  }
})