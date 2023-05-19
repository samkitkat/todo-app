import * as React from 'react';
import { useEffect } from 'react';
import Router from 'next/router';

import Head from 'next/head'
import Script from 'next/script'

// import styles from './layout.module.css'
// import utilStyles from '../styles/utils.module.css'
// import Link from 'next/link'

import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

export default function Layout({ children, home }) {

  const name = '[Your Name]'
  const siteTitle = 'Next.js Sample Website'

  useEffect(() => {
    // courier doesnt get page events only track events it seems
    global.analytics.track("loaded")
    const handleRouteChange = (url) => {
      if (url) {
        global.analytics.page("page loaded", {
          page: url,
        });
      }
    };

    Router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      Router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="todo app"
          content="built with Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        strategy="lazyOnload"
        onLoad={() =>
        console.log(`script loaded correctly, window.FB has been populated`)
        }
      />

      <main className={inter.className}>{children}</main>

    </>
  )
}