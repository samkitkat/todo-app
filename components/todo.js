"use client";
"use server";
import React, { useEffect, useRef, useReducer, useState } from "react";
import { reducer, initialState } from "../reducer";
import styles from "../styles/page.module.css";
import dynamic from "next/dynamic";

const TodoElement = dynamic(() => import("./todoElement"), {
  ssr: false,
});

export default function Todo() {
  let value = [];
  if (typeof window !== "undefined") {
    value = JSON.parse(localStorage.getItem("todos")) || [];
  }

  const [state, dispatch] = useReducer(reducer, initialState, (state) => ({
    ...state,
    todos: value,
  }));
  const { todos, focus } = state;
  const inputRefs = useRef([]);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const allCompleted = todos.every((e) => e.status);
  // analytics.track("todos completed");

  function updateRefs(index, ref) {
    inputRefs.current[index] = ref;
  }

  /* ------------------------------------------------------------------------------------------ */
  const handleKeyDown = (event, index) => {
    const { key } = event;

    if (key === "ArrowDown") {
      const nextIndex = (index + 1) % todos.length;
      inputRefs.current[nextIndex].focus();
    } else if (key === "ArrowUp") {
      const previousIndex = (index - 1 + todos.length) % todos.length;
      inputRefs.current[previousIndex].focus();
    } else if (key === "Enter") {
      dispatch({ type: "newTask" });
    }
  };

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, [focus, inputRefs]);
  /* ------------------------------------------------------------------------------------------ */

  return (
    <div className={styles.todos}>
      <div className={styles.button}>
        <button
          className={styles.button54}
          onClick={() => dispatch({ type: "newTask" })}
        >
          add task
        </button>
      </div>

      {todos &&
        todos.length > 0 &&
        todos.map((todo, index) => (
          <TodoElement
            key={`todoElement-${index}`}
            updateRefs={updateRefs}
            handleKeyDown={handleKeyDown}
            todo={todo}
            dispatch={dispatch}
            index={index}
          ></TodoElement>
        ))}

      <div className={styles.description}>
        {todos.length > 0 && allCompleted ? "tasks completed!" : ""}
      </div>
    </div>
  );
}
