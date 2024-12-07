'use client'

import { useAccountContext } from '@/components/context/accountContext'
import React from 'react'

export default function TabBar() {
    const {walletAddress,type,setType,dumpTypes}:any=useAccountContext()
  return (
    <div className='w-[100%] h-[76px] inset-0 backdrop-blur-lg bg-gradient-to-b  mt-[45px] flex items-center  justify-center relative'>
    {dumpTypes?.map((item:string,index:any)=>(
      <button onClick={()=>{
        setType(item)
      }} className={`${item==type?'opacity-100 bold':'opacity-40 medium'} text-[#B8E6EE] text-[18px] mx-[16px] px-[75px]`}>{item}</button>
    ))}
     
     
    </div>
  )
}
