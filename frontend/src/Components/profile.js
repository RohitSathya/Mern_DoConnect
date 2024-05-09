import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
export default function profile() {
    const navigate=useNavigate()
    useEffect(()=>{
        function g(){
             const ch=localStorage.getItem('token')
             if(!ch||ch==''){
                 navigate('/login')
                  
             }
        }
        g()
   },[])
  return (
    <div>profile</div>
  )
}
