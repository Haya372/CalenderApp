import React, { useState } from "react";
import TextBox from "./TextBox.jsx";
import DateForm from "./DateForm.jsx";

export default function AddForm(props){
  const date = props.date || Date.now();
  const [title, setTitle] = useState('');
  const [start_at, setStartAt] = useState(date);
  const [finish_at, setFinishAt] = useState(null);
  const [tag, setTag] = useState('');
  const [all_day, setAllDay] = useState(false);
  const [memo, setMemo] = useState('');

  return (
    <div>
      <h1>Add form</h1>
      <TextBox value={title} onChange={(e) => setTitle(e.target.value)} />
      <DateForm
        start={start_at}
        onChangeStart={setStartAt}
        finish={finish_at}
        onChangeFinish={setFinishAt}
      />
    </div>
  )
}