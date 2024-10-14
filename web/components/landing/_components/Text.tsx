'use client'
import RetroGrid from '@/components/magic/RetroGrid'
import React from 'react'
import document from '../../../app/assets/document.png' 

function TextComponent() {
  return (
    <div className='w-screen flex flex-col items-center justify-center relative px-[24px] min-h-screen'>
        <p className='sm:text-[48px] text-[32px] text-center medium text-[#00191D] animate-slide-in-bottom'>Transform Your Sh*tcoins into Treasure</p>
        <p className='sm:text-[28px] text-[20px] my-[16px] regular text-[#00191D]  text-center'>Trade in your junk tokens for something that actually matters.</p>
        <div className='w-[100%] flex sm:flex-row flex-col absolute bottom-10 px-[24px] items-center justify-between'>
            <p className='medium sm:text-[16px] text-[12px] text-[#00191D]'>dumpfunxyz@gmail.com</p>
            <div className='flex flex-row my-[12px] items-center justify-center'>
               <button onClick={()=>{
                window.location.href='https://t.me/+WoPP-lH6JLhjY2E1'
               }} className='mr-[12px]'>
                <img className='h-[32px] w-[32px] rounded-[32px]' src={'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/512px-Telegram_logo.svg.png'}/>
                </button> 
                <button onClick={()=>{
                window.location.href='https://x.com/dumpfunxyz'
               }}  className='ml-[12px]'>
                <img className='h-[32px] w-[32px] rounded-[32px]' src={'https://img.freepik.com/free-vector/new-2023-twitter-logo-x-icon-design_1017-45418.jpg?t=st=1725384937~exp=1725388537~hmac=4b26865cae93f5da597999bbe16152c4f0e0c4fe800ade1d99c2083a78d39432&w=826'}/>
                </button> 
                <button onClick={()=>{
                   window.location.href='https://dumpfun-docs.vercel.app/docs/welcome'
                
               }}   className='ml-[12px]'>
                <img className='h-[32px] w-[32px] ' src={document.src}/>
                </button> 
            </div>
            <p className='medium sm:text-[16px] text-[12px] text-[#00191D]'>All rights reserved, Copyright @ 2024 Dumpfun.xyz</p>
        </div>
    </div>
  )
}

export default TextComponent