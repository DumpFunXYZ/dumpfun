'use client'

import React from 'react'
import LoadingIcon from '../../../app/assets/loading.svg'

export default function Loading() {
  return (
    <div style={{zIndex:10}} className='min-h-screen min-w-[100%] absolute backdrop-blur-sm flex items-center justify-center '>
    <div className='w-[100px] h-[100px] flex flex-col relative items-center justify-center'>
        <img src={LoadingIcon.src} className={'min-w-[100%] anim-spin min-h-[100%] absolute left-0 right-0 top-0 bottom-0'} />
        <p className='text-[24px] top-0 left-0 right-0 bottom-0'>💩</p>
    </div>
    </div>
  )
}
