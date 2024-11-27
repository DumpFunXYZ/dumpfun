'use client'
import React from 'react'
import { configureChains, createClient, WagmiConfig } from "wagmi";
import {
  mainnet,
  polygon,
} from "wagmi/chains";
import {
    EthereumClient,
    w3mConnectors,
    w3mProvider,
  } from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { base } from '@/utils/contants';

  export const WagmiProvider = ({children}:any) => {
    let projectId='892fc3740cf9887e8ba7a6cd17b6d45e'
    const chains: any = [
       base,
      mainnet,
      polygon,
    ];
    {
        /*@ts-ignore */
      }
      const { provider } = configureChains(chains, [w3mProvider({ projectId })]);
      {
        /*@ts-ignore */
      }
      const wagmiClient = createClient({
        autoConnect: true,
        connectors: w3mConnectors({ chains, projectId }),
        provider,
      });
      {
        /*@ts-ignore */
      }
      const ethereumClient = new EthereumClient(wagmiClient, chains);
    return (
        <WagmiConfig client={wagmiClient}>
            {children}
            <Web3Modal
                      projectId={projectId}
                      ethereumClient={ethereumClient}
                      themeVariables={{
                        "--w3m-font-family": "Roboto, sans-serif",
                        "--w3m-accent-color": "#99D7E0",
                        "--w3m-background-color": "#000",
                        "--w3m-logo-image-url":
                          "https://i.imgur.com/1KAJiFX.jpeg",
                      }}
                    />
        </WagmiConfig>
    )
}