import React, { useState } from 'react';
import button from '../../../app/assets/button.svg'
import pressed from '../../../app/assets/pressed-button.svg'

export function DumpButton() {
  const [isPressed, setIsPressed] = useState(false);



  return (
    <div className='absolute -top-6'>
    <button
    onClick={()=>{
        setIsPressed(true)
        setTimeout(()=>{
            setIsPressed(false)
        },200)
    }}
    >
    <img src={isPressed ? pressed.src :button.src} className={'w-[100%] scale-x-110'} alt="Pressed Image" />
    </button>
    </div>
  );
}
