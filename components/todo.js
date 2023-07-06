'use client'
'use server'
import { useEffect } from 'react'
import React, { useState } from "react";
import styles from '../styles/page.module.css'
import TodoElement from './todoElement'
import { nanoid } from "nanoid"

export default function Todo() {

    let value = [];
  
    if (typeof window !== "undefined") {
      value = JSON.parse(localStorage.getItem("todos")) || [];
    }
  
    const [todos, setTodos] = React.useState(value)
  
    const [currentTodoId, setCurrentTodoId] = React.useState(
      (todos[0] && todos[0].id) || ""
    )
  
    React.useEffect(() => {
      localStorage.setItem("todos", JSON.stringify(todos))
    }, [todos])
  
  
    function createNewTodo() {
      const newTodo = {
        id: nanoid(),
        key: nanoid(),
        text: "",
        type: "text",
        placeholder: "task todo"
      }
      setTodos(prevTodos => [newTodo, ...prevTodos])
      setCurrentTodoId(newTodo.id)
    }
  
    //for when user checks or unchecks todo
    function handleChange(event, index) {
      const { name, value, type, checked } = event.target;
  
      setTodos(prevTodos => {
        const updatedTodos = prevTodos.map((todo, i) => {
          if (i === index) {
            return {
              ...todo,
              [name]: type === "checkbox" ? checked : value
            };
          }
          return todo;
        });
        // console.log(checked ? "checked" : "unchecked");
        return updatedTodos;
      });
    }
  
    const allCompleted = todos.every(todo => todo.status);
  
    function allTodoDone() {
      // analytics.track("todos completed");
      console.log("completed todos")
    }
  
    return (
      <div className={styles.todos}>
  
        <div className={styles.button}>
          <button className={styles.button54} onClick={createNewTodo}>add task</button>
        </div>
      
        
        {
          todos.length > 0
            ?
              todos.map((todo, index) => (
                <TodoElement
                  key={todo.id}
                  todo={todo}
                  onChange={event => handleChange(event, index)}
                  className={styles.card}
                  value={todo.text}
                  checked={todo.status}
                  newTodo={createNewTodo}
                />
              ))
              :
              ""
          }
  
        {/* <div>{allCompleted ? allTodoDone() : null}</div> */}
  
      </div>
    )
  }