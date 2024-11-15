"use client"
import React, { useState } from 'react'
import { Button } from '../ui/button'
import Navlinks from './Navlinks'
import { RxHamburgerMenu } from 'react-icons/rx'
import { useDispatch } from 'react-redux'
import { loginActive } from '@/Ruduxtoolkit/registerSlice'
import Link from 'next/link'

const Header = () => {
  const [close,setclose] = useState(false)
  const dispatch = useDispatch()

  const sidebarhandle = ()=>{
    setclose(!close)
  }

  return (
   <header className='bg-[#3367bb] px-4 sm:px-10 py-2 sm:py-5 sm:flex justify-between items-center'>
    <div className="logo">
      <Link href={"/"}>
      <h1 className=' text-2xl mb-3 sm:mb-0 sm:text-3xl capitalize text-white'>xyz platform</h1>
      </Link>
    </div>
<Navlinks close={close} setclose={setclose}/>

    <div className="btn flex justify-between sm:justify-center gap-3">
       <Button className='border-none  bg-[#3f59d8] hover:bg-[#4a68ff]' onClick={()=>{
        dispatch(loginActive(true))
       }}>signup</Button>


    <RxHamburgerMenu color='white'  size={40} className='lg:hidden'
    onClick={sidebarhandle}
    />
    </div>
   </header>
  )
}

export default Header