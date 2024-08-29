import React from 'react'

export default function BottomButton({onClick}:any) {
  return (
    <div className="fixed bottom-[62px] max-w-md w-[100%] flex items-center justify-center h-[42px]">
          <button onClick={()=>{
            onClick()
          }} className="bg-[#00191D] press-effect min-w-[300px] h-[56px] rounded-[32px] flex items-center justify-center bold text-[#B8E6EE] animate-slide-in-bottom">
            Choose a Shit Coin
          </button>
        </div>
     
  )
}
