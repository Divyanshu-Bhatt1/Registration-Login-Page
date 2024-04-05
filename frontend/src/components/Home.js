import React, { useEffect } from 'react'
import {useNavigate} from 'react-router-dom';

export default function Home(prop) {
  const navigate=useNavigate()
  useEffect(()=>{
    auth()
  },[prop.login])
  const auth=()=>{
           if(prop.login===false)
           {
            navigate('/login')
           }
  }

  return (
    <div>
      <h1 className='text-6xl text-white bg-slate-900'>This is Home Page</h1>
    </div>
  )
}
