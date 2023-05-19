import * as React from "react";

import { Toast, useToast } from "@trycourier/react-toast";

import { CourierProvider } from "@trycourier/react-provider";
import { Inbox } from "@trycourier/react-inbox";
import Todo from "../components/todo.js";
// import Head from 'next/head'
// import Layout, { siteTitle } from '../components/layout'
import styles from "../styles/page.module.css";

// import Link from 'next/link'
// import Date from '../components/date'

export default function Home() {
  return (
    <div>
      <main className={styles.main}>
        <CourierProvider
          userId={"todo-app-test"}
          clientKey={"ZWQxNWFkYjMtM2M1NC00MGM4LWFkODEtNDczNzUwMWNlZjcw"}
        >
          <Inbox />
          <Toast />
        </CourierProvider>

        <div className={styles.description}>
          <p>
            {`${new Date().toLocaleString("en-US", {
              month: "long",
              day: "2-digit",
            })} Todo's`}
          </p>
        </div>

        <div className={styles.timer}>
          <p>
            {new Date().toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>

        <Todo />
      </main>
    </div>
  );
}
