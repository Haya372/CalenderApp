import React, { useState } from "react";
import TextBox from "./TextBox.jsx";
import CustomCalendar from "./CustomCalender.jsx";

export default function AddForm(props){
  const [title, setTitle] = useState('');
  const [selectedDates, setSelectedDates] = useState([new Date()]);
  const [tag, setTag] = useState('');
  const [all_day, setAllDay] = useState(false);
  const [memo, setMemo] = useState('');
  
  return (
    <div>
      <h1>Add form</h1>
      <TextBox value={title} onChange={(e) => setTitle(e.target.value)} />
      <CustomCalendar
        selectedDates={selectedDates}
        setSelectedDates={setSelectedDates}
      />
    </div>
  )
}