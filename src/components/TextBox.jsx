import React, { useState } from "react";
import styles from "./TextBox.module.css";

export default function TextBox(props){
  const [validation, setValidation] = useState(true);
  const onBlur = () => {
    if(props.value.length === 0){
      setValidation(false);
    }
  }

  const onChange = (e) => {
    if(e.target.value.length >= 0){
      setValidation(true);
    }
    props.onChange(e);
  }

  const labelStyle = `${styles.label} ` + (props.value.length > 0 ? `${styles.entered}` : '');
  return (
    <div className={styles.wrapper}>
      {validation ?
        <div>
          <input
            type="text"
            className={styles.textbox}
            value={props.value}
            onBlur={onBlur}
            onChange={onChange}
          />
          <div className={labelStyle}>title</div>
        </div>
      :
        <div>
          <input
            type="text"
            className={`${styles.textbox} ${styles.validation}`}
            value={props.value}
            onBlur={onBlur}
            onChange={onChange}
          />
          <div className={`${labelStyle} ${styles.red}`}>title</div>
        </div>
      }
    </div>
  )
}