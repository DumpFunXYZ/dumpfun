'use client'
import React from 'react'

// components/HighlightBox.js
export default function HighlightBox({ children }:any) {
    return (
      <div className="relative">
        <div className="absolute top-0 left-0 right-0 bottom-0 border-4 border-blue-500 rounded-lg pointer-events-none z-10"></div>
        {children}
      </div>
    );
  }
  
