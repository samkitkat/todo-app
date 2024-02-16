import React, { useRef, useImperativeHandle } from "react";
import styles from "../styles/page.module.css";
import { FaTrash } from "react-icons/fa6";

const TodoElement = ({ updateRefs, handleKeyDown, todo, dispatch, index }) => {
  return (
    <>
      <div
        className={styles.form}
        key={`task-${index}`}
        draggable
        onDragStart={() => dispatch({ type: "startDrag", index })}
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => dispatch({ type: "stopDrag", index })}
      >
        <div className={styles.checkbox}>
          <input
            type="checkbox"
            key={`checkbox-${index}`}
            id={`checkbox-${index}`}
            name="status"
            checked={todo.status}
            onChange={(event) => dispatch({ type: "checkboxClick", index })}
          />
        </div>
        <input
          autoFocus
          ref={(ref) => updateRefs(index, ref)}
          key={`input-${index}`}
          onKeyDown={(event) => handleKeyDown(event, index)}
          type="text"
          name="text"
          autoComplete="off"
          className={styles.card}
          value={todo.text}
          onChange={(event) =>
            dispatch({ type: "inputTask", index, text: event.target.value })
          }
          index={index}
        />
        <div className={styles.deleteButton}>
          <button
            key={`button-${index}`}
            className={styles.deleteB}
            onClick={() => dispatch({ type: "deleteTask", index })}
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </>
  );
};

export default TodoElement;
