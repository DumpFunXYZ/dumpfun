import React, { useState, useEffect } from "react";

const useAudio = () => {
    const [coins,setCoins]=useState([])
    const [selectedCoins,setSelectedCoins]=useState(null)


  return {
    coins,selectedCoins
  };
};



