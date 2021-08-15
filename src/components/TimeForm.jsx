import React from 'react';
import DateFnsUtils from '@date-io/date-fns'; 
import { TimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

export default function TimeForm(props){
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <TimePicker
        ampm={true}
        label={props.label}
        value={props.time}
        minutesStep={5}
        onChange={props.onChangeTime}
        disabled={props.disabled}
      />
    </MuiPickersUtilsProvider>
  )
}