"use client";
import Head from "next/head";

import * as React from "react";
import { useEffect } from "react";
import Router from "next/router";

import styles from "./layout.module.css";
import { Inter } from "next/font/google";
import { analytics } from "../pages";
const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children, home }) {
  const name = "samkitkat";
  const siteTitle = "sam's todo app";

  useEffect(() => {
    // courier doesnt get page events only track events it seems
    analytics.track("loaded");
    const handleRouteChange = (url) => {
      if (url) {
        global.analytics.page("page loaded", {
          page: url,
        });
      }
    };

    Router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      Router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);

  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.png" />
        <meta name="sam's todo app" content="built with love" />
        {/* <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        /> */}
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <header className={styles.header}>{home}</header>

      <main className={inter.className}>{children}</main>
    </div>
  );
}
