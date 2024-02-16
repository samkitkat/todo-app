import * as React from "react";
import { useState, useEffect } from "react";
import Script from "next/script";

import Layout, { siteTitle } from "../components/layout";
import styles from "../styles/page.module.css";
import Todo from "../components/todo.js";

import { AnalyticsBrowser } from '@segment/analytics-next'
import { CourierProvider } from "@trycourier/react-provider";
import { Inbox } from "@trycourier/react-inbox";
import { Toast, useToast } from "@trycourier/react-toast";

export const analytics = AnalyticsBrowser.load({ writeKey: "3GbOL32DG1ECHglXWzjoAJz6hI6JEIDy" })

export default function Home() {
  //so date and time change without having to refresh page
  var [date, setDate] = useState(new Date());
  useEffect(() => {
    var timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });

  return (
      <Layout home>
        <main className={styles.main}>
          <CourierProvider
            userId={"todo-app-test"}
            clientKey={"ZWQxNWFkYjMtM2M1NC00MGM4LWFkODEtNDczNzUwMWNlZjcw"}
          >
            <Inbox />
            <Toast />
          </CourierProvider>

          <div className={styles.timer}>
            <p>
              {date.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>

          <div className={styles.description}>
            <p>
              {date.toLocaleString("en-US", { month: "long", day: "2-digit" })}{" "}
              Todo's
            </p>
          </div>

          <Todo />
        </main>
      </Layout>
  );
}
