"use client"

import { truncate } from '@/utils/numberUtils'
import React from 'react'
import { dumpNicknames, leaderData } from './constants/nicknames'
import useLeaderboard from './_hooks/useLeaderboard'
import backIcon from '../../app/assets/back.svg'
import { useRouter } from 'next/navigation'


export default function LeaderBoard() {
    const router =useRouter();
    const {rankings}:any=useLeaderboard()

    const getGradientText=(index:number)=>{
        if(index==0){
            return 'gradient-text-gold'
        }
        else if(index==1){
            return 'gradient-text-silver'
        }
        else if(index==2){
            return 'gradient-text-bronze'
        }
        else{
            return 'white'
        }
    }

    return (
    <div className=" h-full flex max-w-screen h-screen overflow-y-hidden w-[100%] self-center w-full bg-[#00191D] flex-col items-center justify-start">
        <div className='sm:w-[400px] w-[95%]  mt-[20px] flex flex-row items-center justify-start'>
        <button onClick={()=>{
            router.back()
        }} className=' mx-[20px]'>
            <img src={backIcon.src}/>
        </button>
        <p className='bold text-[18px]  text-[white]'>Dump Kings</p>
        </div>
        
        <div className='my-[20px] sm:w-[400px] w-screen overflow-y-scroll '>
            {rankings?.map((item:any,index:any)=>(
                <div className={`w-[100%] other rounded-[12px] my-[6px] p-[12px] flex flex-row items-center justify-between`}>
                    <div className='w-[100%] flex flex-row items-center justify-start'>
                    <p className={`text-[32px] text-[white] min-w-[30px] ${getGradientText(index)}`}>{index+1}</p>
                    <div className='flex flex-col items-start ml-[20px] justify-start'>
                    <p className='semiBold text-[16px] text-[white]'>{truncate(item?.name,14)}</p>
                    <p className='semiBold text-[14px] text-[white]'>{(item?.totalPoints)} DUMP </p>
                    </div>
                    </div>
                    <p className='semiBold text-right min-w-[100px] text-[14px] text-[white]'>{dumpNicknames?.[index] || 'Dumpster'}</p>
                    
                </div>
            ))}
        </div>
    </div>
  )
}
