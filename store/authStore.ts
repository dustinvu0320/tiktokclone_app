import create from "zustand"
import {persist} from "zustand/middleware"
import axios from "axios"

const authStore = (set : any) => ({
  userProfile: null,
// This addUser function helps to pass in parameter user and set userProfile state to be user
  addUser: (user: any) => set({userProfile: user}),
  removeUser: () => set({userProfile: null}),
})

const useAuthStore = create (
  persist(authStore, {
    name: 'auth'
  })
)

// useAuthStore as a hook from any components in code
export default useAuthStore;