
import React from 'react'
import Thinking from '../../../app/assets/thinking.jpeg'

function ThinkingMan() {
  return (
    <div className='w-screen bg-[white] flex items-center justify-center sm:px-[48px] px-[12px] min-h-screen sm:flex-row flex-col'>
        <div className='flex w-[100%] h-[100%] flex-col items-center justify-center '>
            <img className='sm:w-[600px] sm:h-[600px] sm:w-[300px] sm:h-[300px]' src={Thinking.src}/>
        </div>
        <div className='flex w-[100%] h-[100%] flex-col sm:items-start items-center sm:justify-center justify-start'>
            <p className='sm:text-[64px] text-[32px] sm:text-left text-center  semiBold text-[#00191D] animate-slide-in-left '>DumpFun</p>
            <p className='text-[18px] regular sm:text-left text-center text-[#00191D]  my-[18px] sm:my-[24px] sm:mt-[32px] mt-[16px] animate-slide-in-left '>Whether you're tired of holding onto worthless coins or just want to have some fun while cleaning up your crypto wallet, DumpFun makes it easy to dump bad tokens, earn $DUMP, and start fresh. Join us in taking out the trash—one token at a time</p>
            {/* <button className='bg-[#42919E] rounded-[32px] animate-slide-in-bottom h-[56px] w-[300px] medium text-[18px] press-effect text-[#00191D]'>Start Dumping</button> */}
        </div>
        
    </div>
  )
}

export default ThinkingMan