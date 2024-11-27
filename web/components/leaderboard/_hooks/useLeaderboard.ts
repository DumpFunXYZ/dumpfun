import { useAccountContext } from "@/components/context/accountContext";
import { getLeaderboard, getUserRewardData } from "@/utils/leaderBoard";
import { useWallet } from "@solana/wallet-adapter-react";
import React, { useState, useEffect } from "react";

const useLeaderboard = () => {
    const [rankings,setRankings]=useState([])
    const [userRank,setUserRank]:any=useState(null)
    const {walletAddress}:any=useAccountContext();

    const fetchRankings=async()=>{
        let data= await getLeaderboard(20);
        setRankings(data);
        console.log('Rankings->',data)
    }
    const fetchUserRank=async()=>{
        let data= await getUserRewardData(walletAddress);
        setUserRank(data);
        console.log('UserRanking->',data)
    }

    useEffect(()=>{
        fetchRankings()
    },[])

    useEffect(()=>{
        if(walletAddress){
            fetchUserRank()
        }
    },[walletAddress])

  return {
    rankings,userRank
  };
};

export default useLeaderboard


