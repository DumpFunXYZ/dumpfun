import React from 'react'
import Dashboard from '../dashboard/dashboard-feature'
import DexScreenerEmbed from './_components/DexEmbedd'

export default function Trade() {
  return (
    <div className='w-[100%] flex flex-row items-start justify-between'>
        <div className='min-w-[430px] h-[100%]'>
            <Dashboard/>
        </div>
        <div className='w-[100%] h-[100%] bg-[blue]'>
            <DexScreenerEmbed/>
        </div>
    </div>
  )
}
