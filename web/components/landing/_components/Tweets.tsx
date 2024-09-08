'use client'
import RetroGrid from '@/components/magic/RetroGrid'
import React from 'react'
import Marquee from "react-fast-marquee";
import { Tweet } from 'react-tweet';
import logo from '../../../app/assets/coin-logo.svg'

function TweetComponent() {
  return (
    <div className='w-screen flex flex-row bg-[#00191D] items-center justify-center relative py-[12px] px-[0px]'>
       <Marquee>
        <p className='bold sm:text-[32px] text-[24px] text-[B8E6EE]'>DUMP</p>
        <img src={logo.src} className={'mx-10'}/>
        <p className='bold sm:text-[32px] text-[24px] text-[B8E6EE]'>DUMP</p>
        <img src={logo.src} className={'mx-10'}/>
        <p className='bold sm:text-[32px] text-[24px] text-[B8E6EE]'>DUMP</p>
        <img src={logo.src} className={'mx-10'}/>
        <p className='bold sm:text-[32px] text-[24px] text-[B8E6EE]'>DUMP</p>
        <img src={logo.src} className={'mx-10'}/>
        <p className='bold sm:text-[32px] text-[24px] text-[B8E6EE]'>DUMP</p>
        <img src={logo.src} className={'mx-10'}/>
        <p className='bold sm:text-[32px] text-[24px] text-[B8E6EE]'>DUMP</p>
        <img src={logo.src} className={'mx-10'}/>
        <p className='bold sm:text-[32px] text-[24px] text-[B8E6EE]'>DUMP</p>
        <img src={logo.src} className={'mx-10'}/>
        <p className='bold sm:text-[32px] text-[24px] text-[B8E6EE]'>DUMP</p>
        <img src={logo.src} className={'mx-10'}/>
        <p className='bold sm:text-[32px] text-[24px] text-[B8E6EE]'>DUMP</p>
        <img src={logo.src} className={'mx-10'}/>
        <p className='bold sm:text-[32px] text-[24px] text-[B8E6EE]'>DUMP</p>
        <img src={logo.src} className={'mx-10'}/>
       </Marquee>
    </div>
  )
}

export default TweetComponent