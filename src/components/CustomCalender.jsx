import React, { useState } from 'react'
import { isSameDay } from 'date-fns'
import { ja } from 'date-fns/locale'
import 'react-nice-dates/build/style.css'
import { Calendar } from 'react-nice-dates'
import './CustomCalender.css'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import Modal from './Modal.jsx';

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

  const modifiers = {
    selected: date => props.selectedDates.some(selectedDate => isSameDay(selectedDate, date))
  }
  const handleDayClick = date => {
    const idx = props.selectedDates.findIndex(item => {
      return checkDate(date, item)
    });
    if(idx !== -1){
      const newArray = props.selectedDates.filter((item) => !checkDate(item, date));
      props.setSelectedDates(newArray.sort((a, b) => a - b));
    }else{
      props.setSelectedDates([...props.selectedDates, date].sort((a, b) => a - b))
    }
  }

  const openModal = () => {
    setModal(true);
  }

  return (
    <div>
      <div className="wrapper" onClick={openModal}>
        <div className="label">日付</div>
        <div className="date">
          {dateFormat(props.selectedDates[0])}
          {props.selectedDates.length > 1 ?
          " ..."
        : ""
        }
        </div>
        <CalendarTodayIcon />
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