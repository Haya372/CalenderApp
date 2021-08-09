import React, { useState } from "react";
import TextBox from "./TextBox.jsx";
import CustomCalendar from "./CustomCalender.jsx"
import TextField from '@material-ui/core/TextField';
import styles from './AddForm.module.css';

export default function AddForm(props){
  const [title, setTitle] = useState('');
  const [selectedDates, setSelectedDates] = useState([new Date()]);
  const [tag, setTag] = useState('');
  const [memo, setMemo] = useState('');
  
  return (
    <div>
      <h1>Add form</h1>
      <TextBox value={title} onChange={(e) => setTitle(e.target.value)} />
      <div className={styles.mt}>
        <CustomCalendar
          selectedDates={selectedDates}
          setSelectedDates={setSelectedDates}
        />
      </div>
      <div className={styles.mtLarge}>
        <TextField
          label="備考"
          multiline
          minRows={10}
          maxRows={10}
          value={memo}
          variant="outlined"
          fullWidth
          onChange={(e) => setMemo(e.target.value)}
        />
      </div>
    </div>
  )
}