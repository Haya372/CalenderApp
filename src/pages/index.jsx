import React, { useEffect, useState } from "react";
import ScheduleCalendar from "../components/ScheduleCalendar.jsx";
import axios from "axios";

export default function IndexPage(props){
  const [schedules, setSchedules] = useState({});
  const [calendarBegin, setCalendarBegin] = useState(new Date());

  useEffect(() => {
    const year = calendarBegin.getFullYear();
    const month = calendarBegin.getMonth();
    axios.get('/api/schedules/', {
      params: {
        year: year,
        month: month
      }
    }).then((res) => {
      const data = res.data;
      console.log(data)
      setSchedules(data.schedules);
    }).catch((err) => {
      if(err.response.data === "Forbitton"){
        // LIFF環境ではLIFFを使った処理に書き換える
        const access_token = "test";
        axios.post('/api/login', { access_token: access_token, user_id: localStorage.getItem('user_id') }).then((res) => {
          axios.get('/api/schedules/', {
            params: {
              year: year,
              month: month
            }
          }).then((res) => {
            const data = res.data;
            console.log(data)
            setSchedules(data.schedules);
          });
        }).catch((err) => {
          console.log(err.message);
        });
      }
      console.log(err)
    });
  }, [calendarBegin]);

  const onCalendarBeginChange = (newValue) => {
    setCalendarBegin(newValue);
  }

  return (
    <div>
      This is index page
      <ScheduleCalendar
        schedules={schedules}
        calendarBegin={calendarBegin}
        onCalendarBeginChange={onCalendarBeginChange}
      />
    </div>
  )
}