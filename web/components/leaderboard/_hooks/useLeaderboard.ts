import { getLeaderboard, getUserRewardData } from "@/utils/leaderBoard";
import { useWallet } from "@solana/wallet-adapter-react";
import React, { useState, useEffect } from "react";

const useLeaderboard = () => {
    const [rankings,setRankings]=useState([])
    const [userRank,setUserRank]:any=useState(null)
    const {publicKey}=useWallet();

    const fetchRankings=async()=>{
        let data= await getLeaderboard(20);
        setRankings(data);
        console.log('Rankings->',data)
    }
    const fetchUserRank=async()=>{
        let data= await getUserRewardData(publicKey?.toString());
        setUserRank(data);
        console.log('UserRanking->',data)
    }

    useEffect(()=>{
        fetchRankings()
    },[])

    useEffect(()=>{
        if(publicKey?.toString()){
            fetchUserRank()
        }
    },[publicKey])

  return {
    rankings,userRank
  };
};

export default useLeaderboard


