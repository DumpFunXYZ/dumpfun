
import './global.css';
import { UiLayout } from '@/components/ui/ui-layout';
import { ClusterProvider } from '@/components/cluster/cluster-data-access';
import { SolanaProvider } from '@/components/solana/solana-provider';
import { ReactQueryProvider } from './react-query-provider';
import { AccountProvider } from '@/components/context/accountContext';
import { TransactionProvider } from '@/components/context/transactionContext';
import { Toaster } from 'react-hot-toast';
import mixpanel from "mixpanel-browser";
import Head from 'next/head';
import Script from 'next/script';
import ToasterComponent from '@/components/ui/ToasterComponent';
export const metadata = {
  title: 'Dump Fun',
  description: 'A place where you dump your sh!t coins',
  image:'https://firebasestorage.googleapis.com/v0/b/dump-fun.appspot.com/o/potential%20logo1.png?alt=media&token=588d2333-f23a-4ec7-a35b-e1de3ecc05a3',
  openGraph: {
    images: 'https://firebasestorage.googleapis.com/v0/b/dump-fun.appspot.com/o/potential%20logo1.png?alt=media&token=588d2333-f23a-4ec7-a35b-e1de3ecc05a3',
  },
};

const links: { label: string; path: string }[] = [
  { label: 'Account', path: '/account' },
  { label: 'Clusters', path: '/clusters' },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
     
      <body suppressHydrationWarning={true}>
      <Head>
<meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/dump-fun.appspot.com/o/potential%20logo1.png?alt=media&token=588d2333-f23a-4ec7-a35b-e1de3ecc05a3" />
<meta name="description" content="A place where you dump your sh!t coins"/>
<meta property="og:url" content="https://dumpfun.xyz"/>
<meta property="og:type" content="website"/>
<meta property="og:title" content="Dump Fun"/>
<meta property="og:description" content="A place where you dump your sh!t coins"/>
<meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/dump-fun.appspot.com/o/potential%20logo1.png?alt=media&token=588d2333-f23a-4ec7-a35b-e1de3ecc05a3" />
<meta name="description" content="A place where you dump your sh!t coins"/>
<meta name="twitter:card" content="summary_large_image"/>
<meta property="twitter:domain" content="dumpfun.xyz"/>
<meta property="twitter:url" content="https://dumpfun.xyz"/>
<meta name="twitter:title" content="Dump Fun"/>
<meta name="twitter:description" content="A place where you dump your sh!t coins"/>
<meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/dump-fun.appspot.com/o/potential%20logo1.png?alt=media&token=588d2333-f23a-4ec7-a35b-e1de3ecc05a3" />
<meta name="description" content="A place where you dump your sh!t coins"/>
</Head>
<Script id="ms_clarity" type="text/javascript">
          {`
        (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "o2xjrhl8cv");
        `}
        </Script>
        
        <Script id='debridgeWidgetScript' src='https://app.debridge.finance/assets/scripts/widget.js'/>
        <div className='status-bar'></div>
        <ReactQueryProvider>
          <ClusterProvider>
            <SolanaProvider>
              <AccountProvider>
                <TransactionProvider>
                <ToasterComponent
 
/>


              <UiLayout links={links}>{children}</UiLayout>
              </TransactionProvider>
              </AccountProvider>
            </SolanaProvider>
          </ClusterProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
