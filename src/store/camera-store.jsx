import axios from 'axios'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { listCategory } from "../api/category-api";

const cameraStore = (set) => ({
    user: null,
    token: null,
    categories: [],
    actionLogin: async (form) => {
        const res = await axios.post('http://localhost:8000/api/login',form)

        set({
            user: res.data.payload,
            token: res.data.token
        })
        return res
    },
    getCategory : async (token) => {
        try {
          const res = await listCategory(token)
          set({categories: res.data})
        } catch (err) {
          console.log(err)
        }
    }

})


const usePersist = {
    name: "camera-store",
    storage: createJSONStorage(()=>localStorage)
}

const useCameraStore = create(persist(cameraStore,usePersist)) 

export default useCameraStore