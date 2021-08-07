import React from 'react';
import DateFnsUtils from '@date-io/date-fns'; 
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import styles from './DateForm.module.css';

export default function DateForm(props){
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div className={styles.child}>
        <KeyboardDateTimePicker
          ampm={true}
          label="start"
          value={props.start}
          onChange={props.onChangeStart}
          format="yyyy/MM/dd HH:mm"
        />
      </div>
      <div className={styles.child}>
        <KeyboardDateTimePicker
          ampm={true}
          label="end"
          value={props.finish}
          onChange={props.onChangeFinish}
          format="yyyy/MM/dd HH:mm"
        />
      </div>
    </MuiPickersUtilsProvider>
  )
}