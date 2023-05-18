import React, { useState } from "react";
import styles from '../page.module.css';

export default function TodoElement(props) {

    return (
        <div className={styles.form}>
            <div className={styles.checkbox}>
            
            {/* analytics.track for when button is pressed, looks kinda ugly but works */}
            <button onClick={() => analytics.track('hello')}><input
                    type="checkbox"
                    id="checkbox"
                    checked={props.checked}
                    onChange={props.onChange}
                    name="status"
                /></button>
            </div>
            <input
                type="text"
                placeholder="todo text"
                className={styles.card}
                name="text"
                value={props.value}
                id={props.id}
                onChange={props.onChange}
            />
        </div>
    )
}