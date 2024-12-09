'use client'
import { useAccountContext } from '@/components/context/accountContext'
import { truncate } from '@/utils/numberUtils'
import React, { useEffect, useState } from 'react'
import WalletIcon from '../../../app/assets/wallet.svg'
import Flush from '../../../app/assets/FlushButton.svg'
import SolanaLogo from '../../../app/assets/solana.svg'
import { useTransactionContext } from '@/components/context/transactionContext'

export default function CloseAccount() {
    const {walletAddress,closeAccounts}:any= useAccountContext()
    const {onCloseAccountClicked}:any=useTransactionContext()
    const [totalSolana,setTotalSolana]=useState(0);
    const [selected,setSelected]=useState(false)
    useEffect(()=>{
        if(closeAccounts?.length>0){
            const value = closeAccounts?.reduce((sum:any, item:any) => sum + item.account?.lamports, 0);
            setTotalSolana(value/10**9)

        }
    },[closeAccounts])
    //console.log(closeAccounts);
  return (
    <div className='w-[100%] relative overflow-y-scroll flex flex-col items-center justify-start bg-[#00191D] '>
        <div className='p-[24px] flex flex-col items-center justify-start'>
        <p className='bold text-[18px] text-[#B8E6EE]'>How does FlushIt Works? </p>
        <p className='max-w-md text-center text-[#B8E6EE] text-[14px] regular mt-[12px] leading-6'> FlushIt closes your 0 account balances on Solana and reclaims the Sol it took to open those token accounts, usually 0.002 Sol. It's 100% safe to use and NEVER burns your <br/> tokens / NFTs.</p>
        {/* <p className='bold text-[24px] my-[16px] text-[#B8E6EE]'>Select Wallet</p> */}
        <button onClick={()=>{
            if(closeAccounts?.length>0){
                setSelected(!selected)
            }
        }}  className={`w-[300px] rounded-[32px] border mt-[16px] py-[24px] ${selected?'border-[#B8E6EE]':'border-[#00292F]'}  flex flex-col items-center justify-center`}>
        <img src={WalletIcon.src}/>
        <p className='text-[#B8E6EE] text-[16px] medium my-[16px]'>{truncate(walletAddress,12)}</p>
        <p className='text-[#B8E6EE] text-[16px] medium'>Vacant Accounts: {closeAccounts?.length}</p>
        </button>

        <div className='flex flex-col my-[12px] items-center justify-start '>
        <p className='text-[#B8E6EE] text-[14px] medium mb-[24px]'>By flushing this account you will receive</p>
        <p className='text-[#B8E6EE] text-[18px] bold mb-[24px] flex flex-row items-center justify-center'><img className='w-[16px] h-[16px] mr-[4px]' src={SolanaLogo.src}/> {totalSolana}</p>
            
            <button onClick={()=>{
                if(selected){
                    onCloseAccountClicked();
                }
                
            }} className=''>
                <img src={Flush.src}/>
            </button>
        </div>
       
        </div>
       
    </div>
  )
}
