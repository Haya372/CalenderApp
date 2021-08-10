import React, { useState } from "react";
import TextBox from "./TextBox.jsx";
import CustomCalendar from "./CustomCalender.jsx"
import TextField from '@material-ui/core/TextField';
import styles from './AddForm.module.css';
import Button from '@material-ui/core/Button';
import axios from "axios";

export default function AddForm(props){
  const [title, setTitle] = useState('');
  const [selectedDates, setSelectedDates] = useState([new Date()]);
  const [tag, setTag] = useState('');
  const [memo, setMemo] = useState('');

  const onClick = () => {
    // 提出処理
    const data = {
      title: title,
      dates: selectedDates,
      tag: tag,
      memo: memo
    }
    console.log('提出')
    axios.post('/api/schedules', { data: data }).then((res) => {
      console.log(res.data);
      alert(res.data);
    }).catch(err => alert('server error'));
  }
  
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
      <div className={styles.buttonLayout}>
        <Button
          onClick={onClick}
          variant="contained"
          color="primary"
        >作成</Button>
      </div>
    </div>
  )
}