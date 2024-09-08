'use client'
import React from 'react'
import Logo from '../../../app/assets/logo.svg'

function Hero() {
  return (
    <div className='w-screen bg-[#00191D] flex items-center justify-center sm:px-[48px] px-[12px] min-h-screen sm:flex-row flex-col-reverse'>
        <div className='flex w-[100%] h-[100%] flex-col sm:items-start items-center sm:justify-center justify-start'>
            <p className='sm:text-[64px] text-[32px] sm:text-left text-center  semiBold text-[white] sm:animate-slide-in-left '>Dumping <span className='text-[#ACE7F0]'>Sh!tcoins</span><br/>made easy</p>
            <p className='text-[22px] regular sm:text-left text-center text-[white] my-[18px] sm:my-[24px] sm:animate-slide-in-left '>Discover the ultimate platform to offload your unwanted tokens and find hidden value in the crypto world.</p>
            <button onClick={()=>{
              window.location.href='https://forms.gle/zC793WeL2Lbw9Fjk9'
            }} className='bg-[rgba(37,179,204)] rounded-[32px] animate-slide-in-bottom h-[56px] w-[300px] medium text-[18px] press-effect text-[#00191D]'>Join the Whitelist</button>
        </div>
        <div className='flex w-[100%] h-[100%] flex-col items-center justify-center '>
            <img className='w-[325px] h-[325px] animate-slide-in-right' src={Logo.src}/>
        </div>
    </div>
  )
}

export default Hero