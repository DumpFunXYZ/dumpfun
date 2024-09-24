'use client'
import React from 'react';

const DexScreenerEmbed = () => {
  return (
    <div className="dexscreener-embed overflow-y-scroll pb-[200px] h-[80%]">
      <iframe
        src="https://dexscreener.com/solana/EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm?embed=1&info=1"
        allowFullScreen
        frameBorder="0"
      ></iframe>
      <style jsx>{`
        .dexscreener-embed {
          position: relative;
          width: 100%;
          padding-bottom: 0%;
        }
        @media (min-width: 1400px) {
          .dexscreener-embed {
            padding-bottom: 80%;
          }
        }
        .dexscreener-embed iframe {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          border: 0;
        }
      `}</style>
    </div>
  );
};

export default DexScreenerEmbed;