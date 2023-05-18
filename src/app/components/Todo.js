'use client'
import { useEffect } from 'react'
import React, { useState } from "react";
import styles from '../page.module.css'
import TodoElement from './TodoElement'

export default function Todo() {

    const [todos, setTodos] = React.useState([
        {
          id: 1,
          text: "",
          status: false
        },
        {
          id: 2,
          text: "",
          status: false
        },
        {
          id: 3,
          text: "",
          status: false
        }
      ]);

    console.log(Object.keys(todos).length)
    console.log(todos)

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
      
          return updatedTodos;
        });
      }

      const allCompleted = todos.every(todo => todo.status);

    return (
        <div className={styles.todos}>

            {todos.map((todo, index) => (
            <TodoElement
                key={todo.id}
                todo={todo}
                onChange={event => handleChange(event, index)}
                className={styles.card}
                value={todo.text}
                checked={todo.status}
            />
            ))}


            <div>{allCompleted ? "woo" : null}</div>

        </div>
    )
}
