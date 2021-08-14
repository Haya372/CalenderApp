import React, { useEffect, useState } from "react";
import ScheduleCalendar from "../components/ScheduleCalendar.jsx";
import axios from "axios";
import { useHistory } from "react-router";

export default function IndexPage(props){
  const [schedules, setSchedules] = useState({});
  const [calendarBegin, setCalendarBegin] = useState(new Date());
  const history = useHistory();

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
        history.push('/login');
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