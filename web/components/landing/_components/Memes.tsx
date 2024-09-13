import React from 'react'
import { Tweet } from 'react-tweet'

export default function Memes() {
  return (
    <div className='w-[100%] min-h-[screen] flex sm:flex-row flex-col px-[12px] sm:items-center items-center sm:justify-between justify-between'>
        <div className='sm:w-[30%] w-[90%]'>
        <Tweet id='1833716204873339016'/>
        </div>
        <div className='sm:w-[30%] w-[90%] sm:my-[20px]'>
        <Tweet id='1833145836458451445'/>
        </div>
        <div className='sm:w-[30%] w-[90%]'>
        <Tweet id='1833141558113194115'/>
        </div>
    </div>
  )
}
