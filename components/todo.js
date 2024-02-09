'use client'
'use server'
import React, { useState, useRef, useEffect } from 'react';
import styles from '../styles/page.module.css'
import { nanoid } from "nanoid"
import { FaTrash } from "react-icons/fa6";
// import TodoElement from './todoElement'

export default function Todo() {

  let value = [];
  if (typeof window !== "undefined") {
    value = JSON.parse(localStorage.getItem("todos")) || [];
  }

  const [todos, setTodos] = useState(value);
  const [currentTodoId, setCurrentTodoId] = useState((todos[0] && todos[0].id) || "")
  const [dragItemIndex, setDragItemIndex] = useState();
  const [dragOverItemIndex, setDragOverItemIndex] = useState();
  const isActive = currentTodoId;
  const inputRefs = useRef([]);

  React.useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  /* ------------------------------------------------------------------------------------------ */
  function createNewTodo() {
    const newTodo = {
      id: nanoid(),
      key: nanoid(),
      value: "",
      status: false,
      text: "",
      type: "text",
      placeholder: "task",
      handleKeyDown: "",
      current: isActive,
      index: "",
    }
    setTodos(prevTodos => [newTodo, ...prevTodos])
    setCurrentTodoId(newTodo.id)
  }

  const deleteTodo = (id) => setTodos(todos.filter((todo) => todo.id !== id));


  /* ------------------------------------------------------------------------------------------ */
  //for when user checks or unchecks todo
  function handleChange(event, index) {
    const { name, value, type, checked } = event.target;
    setTodos(prevTodos => {
      const updatedTodos = prevTodos.map((todo, i) => {
        if (i === index) {
          return {
            ...todo,
            [name]: type === "checkbox" ? checked : value,
          };
        }
        return todo;
      });
      return updatedTodos;
    });
  }
  const allCompleted = todos.every(e => e.status);
  // analytics.track("todos completed");
  /* ------------------------------------------------------------------------------------------ */
  const handleKeyDown = (event, index) => {
    const { key } = event;

    if (key === 'ArrowDown') {
      const nextIndex = (index + 1) % todos.length;
      inputRefs.current[nextIndex].focus();
    }
    else if (key === 'ArrowUp') {
      const previousIndex = (index - 1 + todos.length) % todos.length;
      inputRefs.current[previousIndex].focus();
    }
    else if (key === 'Enter') {
      createNewTodo();
    }
  };
  /* ------------------------------------------------------------------------------------------ */
  const handleClick = (event, index) => {
    // Log details when the input is clicked
    console.log('Input clicked! Details:', {
      id: todos[index].id,
    });
  };
  /* ------------------------------------------------------------------------------------------ */
  const handleDragStart = index => {
    setDragItemIndex(index)
  };

  const handleDragOver = event => {
    event.preventDefault();
  };

  const handleDrop = (index) => {
    // const _todos = [...todos];
    // const dragItem = _todos.splice(dragItemIndex, 1);
    // _todos.splice(dragOverItemIndex, 0, dragItem);
    // setTodos(_todos)
    const temp = todos[dragItemIndex].text;
    const temp2 = todos[index].text;
    todos[dragItemIndex].text = temp2;
    todos[index].text = temp;
  };

  const handleDragEnter = index => {
    setDragOverItemIndex(index)
  };

  const handleDragLeave = (event) => {
    setDragOverItemIndex(undefined)
  };

  const handleDragEnd = (event) => {
    setDragItemIndex(undefined)
    setDragOverItemIndex(undefined)
  };
  /* ------------------------------------------------------------------------------------------ */

  return (
    <div className={styles.todos}>
      <div className={styles.button}>
        <button className={styles.button54} onClick={createNewTodo}>add task</button>
      </div>

      {
        todos && todos.length > 0 &&
        todos.map((todo, index) => (

          <div
            className={styles.form}
            key={todo.id}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(index)}
            onDragEnter={() => handleDragEnter(index)}
            onDragLeave={handleDragLeave}
            onDragEnd={handleDragEnd}
          >

            <div className={styles.checkbox}>
              <input
                type="checkbox"
                key={todo.id}
                id={`checkbox-${index}`}
                name="status"
                checked={todo.status}
                onChange={event => handleChange(event, index)}
              />
            </div>
            <input
              autoFocus
              ref={(ref) => (inputRefs.current[index] = ref)}
              key={todo.id}
              onKeyDown={event => handleKeyDown(event, index)}
              type="text"
              name="text"
              autoComplete="off"
              className={styles.card}
              value={todo.text}
              onChange={event => handleChange(event, index)}
              index={index}
              onClick={event => handleClick(event, index)}
              deleteTodo={deleteTodo}
            />
            <div className={styles.deleteButton}>
              <button className={styles.deleteB} onClick={() => deleteTodo(todo.id)}><FaTrash /></button>
            </div>
          </div>
        ))
      }

      <div className={styles.description}>{todos.length > 0 && allCompleted ? "tasks completed!" : ""}</div>

    </div>
  )
}