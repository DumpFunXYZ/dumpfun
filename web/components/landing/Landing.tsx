import React from 'react'
import NavBar from '../dashboard/_components/NavBar'
import Hero from './_components/Hero'
import Mockup from './_components/Mockup'
import NavbarLanding from './_components/NavBar'
import Stats from './_components/Stats'
import TextComponent from './_components/Text'
import ThinkingMan from './_components/ThinkingMen'
import TweetComponent from './_components/Tweets'

function Landing() {
  return (
    <div className='w-[100%] flex flex-col overflow-x-hidden h-screen overflow-y-scroll items-center bg-[white] justify-start'>
      <NavbarLanding/>
        <Hero/>
        <ThinkingMan/>
        <Mockup/>
        <Stats/>
        <TweetComponent/>
        <TextComponent/>

    </div>
  )
}

export default Landing