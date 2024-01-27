import React, { useRef, useImperativeHandle } from "react";
import styles from '../styles/page.module.css'

const TodoElement = (props) => {

    return (
        <div className={styles.form} key={props.key}>
            <div className={styles.checkbox}>
            <input
                    type="checkbox"
                    key={props.key}
                    id={props.id}
                    checked={props.checked}
                    onChange={props.onChange}
                    name="status"
                />
            </div>
            <input
                autoFocus
                ref={props.ref}
                type={props.type}
                placeholder={props.placeholder}
                className={styles.card}
                name="text"
                autoComplete="off"
                value={props.value}
                id={props.index}
                onChange={props.onChange}
                onKeyDown={props.onKeyDown}
                onClick={props.handleClick}
            />
        </div>
    )
}

export default TodoElement;