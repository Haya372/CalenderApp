import React, { useEffect, useState } from "react";
import ScheduleCalendar from "../components/ScheduleCalendar.jsx";
import axios from "axios";
import { useHistory } from "react-router";
import liff from '@line/liff';
import { useDispatch } from "react-redux";
import { setUser } from '../store/auth.js';
import { useSelector } from "react-redux";
import Layout from '../components/Layout.jsx';

export default function IndexPage(props){
  const [schedules, setSchedules] = useState({});
  const [calendarBegin, setCalendarBegin] = useState(new Date());
  const history = useHistory();
  const dispach = useDispatch();
  const user_id = useSelector(state => state.user.user_id);

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
      setSchedules(data.schedules);
    }).catch((err) => {
      if(err.response.data === "Forbitton"){
        history.push('/login');
      }
      console.log(err)
    });
  }, [calendarBegin]);

  useEffect(() => {
    // ログイン後はこのページに飛ばされるのでここで
    liff.init({liffId: process.env.LIFF_ID}).then(() => {
      if(liff.isLoggedIn() && !user_id){
        liff.getProfile().then((profile) => {
          axios.post('/api/login', { line_id: profile.userId }).then((res) => {
            const user_info = res.data;
            dispach(setUser(user_info));
            history.push('/');
          }).catch((err) => {
            console.log(err)
            if(err.response && err.response.data === "Not found"){
              const access_token = "test" //liff.getAccessToken();
              axios.post('/api/login', { access_token: access_token, user_id: localStorage.getItem('user_id') }).then((res) => {
                const user_info = res.data;
                dispach(setUser(user_info));
                history.push('/');
              }).catch((err) => {
                console.log(err.message);
              })
            }
          })
        })
      }
    })
  }, []);

  const onCalendarBeginChange = (newValue) => {
    setCalendarBegin(newValue);
  }

  return (
    <Layout header={`${calendarBegin.getFullYear()}年${calendarBegin.getMonth() + 1}月`} home={true}>
      <ScheduleCalendar
        schedules={schedules}
        calendarBegin={calendarBegin}
        onCalendarBeginChange={onCalendarBeginChange}
      />
    </Layout>
  )
}