'use client'
import RetroGrid from '@/components/magic/RetroGrid'
import React from 'react'

function Stats() {
  return (
    <div className='w-screen flex flex-col bg-[white] items-center justify-center relative px-[24px] min-h-screen'>
       <iframe className='sm:w-[100%] w-[100%] h-[70%] sm:p-[24px] p-[12px] sm:h-[100%]' src="https://dune.com/embeds/3756231/6378326/"/>
    </div>
  )
}

export default Stats