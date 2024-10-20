import axios from 'axios'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { listCategory } from "../api/category-api";
import { listProduct,searchFilters } from '../api/product-api';
import _ from 'lodash'

const cameraStore = (set,get) => ({
    user: null,
    token: null,
    categories: [],
    products: [],
    carts: [],

    actionAddtoCart: (product) => {
      const carts = get().carts
      const updateCart = [...carts,{...product, count:1 }]

      // Unique
      const unique = _.unionWith(updateCart,_.isEqual)
      set({ carts: unique })

    },

    actionUpdateQuantity : (productId,newQuantity)=>{
      set((state)=>({
        carts : state.carts.map((item)=>
          item.id === productId
            ? { ...item, count: Math.max(1, newQuantity) }
            : item
        )
      }))
    },
    
    actionRemoveProduct : (productId) => {
      console.log('remove product',productId)
      set((state)=>({
        carts : state.carts.filter((item)=>
          item.id !== productId
        )
      }))
    },

    getTotalPrice : () =>{
    return get().carts.reduce((total,item)=>{
      return total + item.price * item.count
    },0)
   },

    actionLogin: async (form) => {
        const res = await axios.post('http://localhost:8000/api/login',form)

        set({
            user: res.data.payload,
            token: res.data.token
        })
        return res
    },

    actionLogout: ()=> {
      localStorage.clear()
      set({ user: null, token:null})
    },

    getCategory : async () => {
        try {
          const res = await listCategory()
          set({categories: res.data})
        } catch (err) {
          console.log(err)
        }
    },

    actionSearchFilter : async (arg) => {
        try {
          const res = await searchFilters(arg)
          set({ products: res.data})
        } catch (err) {
          console.log(err)
        }
    },

    getProduct : async (count) => {
        try {
          const res = await listProduct(count)
          set({products: res.data})
        } catch (err) {
          console.log(err)
        }
    },
    
    

})


const usePersist = {
    name: "camera-store",
    storage: createJSONStorage(()=>localStorage)
}

const useCameraStore = create(persist(cameraStore,usePersist)) 

export default useCameraStore