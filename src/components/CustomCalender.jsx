import React, { useState } from 'react'
import { isSameDay } from 'date-fns'
import { ja } from 'date-fns/locale'
import 'react-nice-dates/build/style.css'
import { Calendar } from 'react-nice-dates'
import './CustomCalender.css'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import Modal from './Modal.jsx';
import { useEffect } from 'react'
import TimeForm from './TimeForm.jsx'

// Very rough implementation of multiple date selection

const checkDate = (date1, date2) => {
  const year = date1.getFullYear() === date2.getFullYear();
  const month = date1.getMonth() === date2.getMonth();
  const date = date1.getDate() === date2.getDate();
  return year && month && date;
}

const dateFormat = (date) => {
  if(!date) return "日付を入力してください"
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  if(month < 10) month = '0' + month;
  let day = date.getDate();
  if(day < 10) day = '0' + day;
  return year + '-' + month + '-' + day;
}

export default function CustomCalendar(props) {
  const [modal, setModal] = useState(false);
  const now = new Date();
  now.setMinutes(0);
  const [time, setTime] = useState(now);

  const modifiers = {
    selected: date => props.selectedDates.some(selectedDate => isSameDay(selectedDate, date))
  }
  const handleDayClick = date => {
    const idx = props.selectedDates.findIndex(item => {
      return checkDate(date, item)
    });
    if(idx !== -1){
      // すでに選択済みの日にちを選んでいたら
      const newArray = props.selectedDates.filter((item) => !checkDate(item, date));
      props.setSelectedDates(newArray.sort((a, b) => a - b));
    }else{
      date.setHours(time.getHours());
      date.setMinutes(time.getMinutes());
      props.setSelectedDates([...props.selectedDates, date].sort((a, b) => a - b))
    }
  }

  const openModal = () => {
    setModal(true);
  }

  useEffect(() => {
    const hour = time.getHours();
    const minute = time.getMinutes();
    const newArray = props.selectedDates.map((item) => {
      item.setHours(hour);
      item.setMinutes(minute);
      return item;
    });
    props.setSelectedDates(newArray);
  }, [time]);

  return (
    <div>
      <div className="flex">
        <div>
          <div className="label">日付</div>
          <div className="wrapper" onClick={openModal}>
            <div className="date">
              {dateFormat(props.selectedDates[0])}
              {props.selectedDates.length > 1 ?
              " ..."
            : ""
            }
            </div>
            <CalendarTodayIcon />
          </div>
        </div>
        <div>
          <TimeForm time={time} onChangeTime={setTime} label="開始時間"/>
        </div>
      </div>
      { modal ?
        <Modal setModal={setModal}>
          <div className="modal-bottom">
            <Calendar onDayClick={handleDayClick} modifiers={modifiers} locale={ja} />
          </div>
        </Modal>
      : null
      }
    </div>
  )
}