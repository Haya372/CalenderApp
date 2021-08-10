import React from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";

export default function Modal(props){
  return ReactDOM.createPortal((
    <div className={styles.wrapper} onClick={() => props.setModal(false)}>
      {props.children}
    </div>
  ), document.getElementById('modal'))
}
