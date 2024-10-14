import React, { useEffect, useState } from 'react'
import useCameraStore from '../store/camera-store'
import { currentAdmin } from '../api/auth-api'
import LoadingToRedirect from './LoadingToRedirect'


export default function ProtectRouteAdmin({element}) {
    const [ok,setOk] = useState(false)
    const user = useCameraStore((state)=> state.user)
    const token = useCameraStore((state)=> state.token)

    useEffect(()=>{
        if(user && token) {
            currentAdmin(token)
            .then((res)=>setOk(true))
            .catch((err)=>setOk(false))
        }
    },[])

  return (
      ok ?  element : <LoadingToRedirect /> 
  )
}
