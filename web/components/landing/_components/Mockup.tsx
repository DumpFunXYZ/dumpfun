import React from 'react'
import Iphone15Pro from '../../../app/assets/demo1.gif'
function Mockup() {
  return (
    <div className='w-screen bg-[#00191D]  flex items-center justify-center sm:px-[48px] px-[12px] min-h-screen flex-col'>
        
        <div className='sm:w-[20%] w-[90%] relative sm:h-[70%] h-[80%] flex flex-col items-center justify-center'>
      
      <img className='w-[100%] h-[100%]' src={Iphone15Pro.src} />
        </div>
        <button style={{lineHeight:'32px'}} className='bg-[#42919E] my-[20px] rounded-[32px] min-h-[56px] w-[300px] flex items-center justify-center text-[#00191D] text-[22px] semiBold'>Join the Whitelist</button>
    </div>
    
  )
}

export default Mockup