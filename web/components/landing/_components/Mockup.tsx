'use client'
import React from 'react'
/*@ts-ignore*/
import Iphone15Pro from '../../../app/assets/demo1.gif'
function Mockup() {
  return (
    <div className='w-screen bg-[#00191D]  flex items-center justify-center sm:px-[48px] px-[12px] min-h-screen flex-col'>
        
        <img className='w-[320px] h-[600px]' src={Iphone15Pro.src} />
        <button
        onClick={()=>{
          if(typeof window!=='undefined'){
            let origin=window.location.origin
            window.location.href=`${origin}/app`
          }
        }}
        style={{lineHeight:'32px'}} className='bg-[rgba(37,179,204)] my-[30px] rounded-[32px] min-h-[56px] w-[300px] flex items-center justify-center text-[#00191D] text-[22px] bold'>Start Dumping</button>
    </div>
    
  )
}

export default Mockup