import React, { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import styles from "./ScheduleCalendar.module.css";
import './ScheduleCalendar.css';

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
      const onClick = () => {
        console.log(item.id + "がクリックされました");
        // routerの処理を追加する

      }
      return (
        <li onClick={onClick} className={styles.listContent} key={item.id}>
          {item.title}
        </li>
      )
    })
    return (
      <div className={styles.dateTileContent}>
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
      />
    </div>
  )
}