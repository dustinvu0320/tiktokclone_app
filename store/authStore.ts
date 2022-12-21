import create from "zustand"
import {persist} from "zustand/middleware"
import axios from "axios"

import { BASE_URL } from "../utils"

const authStore = (set : any) => ({
  userProfile: null,
  allUsers: [],

// This addUser function helps to pass in parameter user and set userProfile state to be user
  addUser: (user: any) => set({userProfile: user}),
  removeUser: () => set({userProfile: null}),

  fetchAllUsers: async () => {
    const response = await axios.get(`${BASE_URL}/api/users`);

    set({allUsers: response.data});
  }
})

const useAuthStore = create (
  persist(authStore, {
    name: 'auth'
  })
)

// useAuthStore as a hook from any components in code
export default useAuthStore;