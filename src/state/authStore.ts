import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface User {
  name: string
  email: string
  avatar?: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  setUsername: (name: string) => void
}

// Safe localStorage wrapper that handles JSON parse errors
const safeLocalStorage = {
  getItem: (key: string): string | null => {
    try {
      return localStorage.getItem(key)
    } catch {
      return null
    }
  },
  setItem: (key: string, value: string): void => {
    try {
      localStorage.setItem(key, value)
    } catch {
      // Storage full or unavailable
    }
  },
  removeItem: (key: string): void => {
    try {
      localStorage.removeItem(key)
    } catch {
      // Storage unavailable
    }
  },
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, _password: string) => {
        set({ isLoading: true })
        await new Promise((resolve) => setTimeout(resolve, 600))

        const name = email.split('@')[0]
        set({
          user: { name, email },
          isAuthenticated: true,
          isLoading: false,
        })
        return true
      },

      logout: () => {
        set({ user: null, isAuthenticated: false })
      },

      setUsername: (name: string) => {
        set((state) => ({
          user: state.user ? { ...state.user, name } : null,
        }))
      },
    }),
    {
      name: 'doubt-solver-auth',
      storage: createJSONStorage(() => safeLocalStorage),
    }
  )
)
