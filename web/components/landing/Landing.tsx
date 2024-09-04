import React from 'react'
import Hero from './_components/Hero'
import Mockup from './_components/Mockup'
import TextComponent from './_components/Text'
import ThinkingMan from './_components/ThinkingMen'

function Landing() {
  return (
    <div className='w-[100%] flex flex-col overflow-x-hidden h-screen overflow-y-scroll items-center bg-[white] justify-start'>
        <Hero/>
        <ThinkingMan/>
        <Mockup/>
        <TextComponent/>

    </div>
  )
}

export default Landing