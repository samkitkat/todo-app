import * as React from 'react';
import { useState, useEffect } from 'react';
import Script from 'next/script'

import Layout, { siteTitle } from '../components/layout'
import styles from '../styles/page.module.css'
import Todo from '../components/todo.js'

import * as snippet from '@segment/snippet'
import { CourierProvider } from "@trycourier/react-provider";
import { Inbox } from "@trycourier/react-inbox";
import { Toast, useToast } from "@trycourier/react-toast";

export default function Home() {

  function renderSnippet() {
    const opts = {
      apiKey: '3GbOL32DG1ECHglXWzjoAJz6hI6JEIDy'
    }
    if (process.env.NODE_ENV === 'development') {
      return snippet.max(opts)
    }
    return snippet.min(opts)
  }

  //so date and time change without having to refresh page
  var [date,setDate] = useState(new Date());
  useEffect(() => {
      var timer = setInterval(()=>setDate(new Date()), 1000 )
      return function cleanup() {
          clearInterval(timer)
      }
  });

  return (
    <Layout home>
      <Script
        id="segment-script"
        dangerouslySetInnerHTML={{ __html: renderSnippet() }}
      />

      <main className={styles.main}>

        <CourierProvider userId={"todo-app-test"} clientKey={"ZWQxNWFkYjMtM2M1NC00MGM4LWFkODEtNDczNzUwMWNlZjcw"}>
          <Inbox />
          <Toast />
        </CourierProvider>

        <div className={styles.description}>
        <p>
          {date.toLocaleString("en-US", { month: "long", day: '2-digit' })} Todo's
        </p>
      </div>

      <div className={styles.timer}>
        <p>
          {date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </p>
      </div>

        <Todo />
      </main>
    </Layout>
  )
}
