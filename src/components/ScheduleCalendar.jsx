import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import styles from "./ScheduleCalendar.module.css";
import './ScheduleCalendar.css';
import Modal from './Modal.jsx';
import ScheduleList from "./ScheduleList.jsx";

const dateFormat = (date) => {
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  if(month < 10) month = '0' + month;
  let day = date.getDate();
  if(day < 10) day = '0' + day;
  return year + '-' + month + '-' + day;
}

export default function ScheduleCalendar(props){
  const [date, setDate] = useState(new Date());
  const [modal, setModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    if(!modal){
      setSelectedDate(null);
    }
  }, [modal]);

  const formatDay = (locale, date) => {
    return date.getDate();
  }

  const tileContent = (prop) => {
    const view = prop.view;
    const date = prop.date;
    if(view !== "month"){
      return null;
    }
    if(!props.schedules){
      return <div className={styles.dateTileContent}></div>;
    }
    const data = props.schedules[dateFormat(date)];
    if(!props.schedules[dateFormat(date)]){
      return <div className={styles.dateTileContent}></div>;
    }
    const listItems = data.map((item) => {
      return (
        <li className={styles.listContent} key={item.id}>
          {item.title}
        </li>
      )
    })

    const onClick = () => {
      setSelectedDate(date);
      setModal(true);
    }

    return (
      <div className={styles.dateTileContent} onClick={onClick}>
        <ul className={styles.ulWrapper}>{listItems}</ul>
      </div>
    )
  }

  const tileClassName = (prop) => {
    const view = prop.view;
    if(view !== "month"){
      return null;
    }
    return styles.dateTile;
  }

  const onActiveStartDateChange = (prop) => {
    props.onCalendarBeginChange(prop.activeStartDate);
  }

  return (
    <div>
      <Calendar
        locale="ja-JP"
        value={date}
        formatDay={formatDay}
        tileContent={tileContent}
        tileClassName={tileClassName}
        view="month"
        onActiveStartDateChange={onActiveStartDateChange}
        className={styles.calendar}
        calendarType="US"
      />
      {modal ? 
      <Modal setModal={setModal}>
        <div className={styles.modalBottom}>
          <ScheduleList schedules={props.schedules[dateFormat(selectedDate)]} />
        </div>
      </Modal>
      :null
      }
    </div>
  )
}