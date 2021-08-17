import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import ScheduleView from "../components/ScheduleView.jsx";
import CircularProgress from '@material-ui/core/CircularProgress';
import Layout from '../components/Layout.jsx';

export default function SchedulePage(props){
  const { id } = useParams();
  const [schedule, setSchedule] = useState({});
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    axios.get('/api/schedules/' + id).then(res => {
      setSchedule(res.data);
    }).catch(err => {
      setNotFound(true);
    });
  }, []);


  const headerText = () => {
    if(!schedule.start_at){
      return "Loading...";
    }
    const date = new Date(schedule.start_at);
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
  }

  return (
    <Layout header={headerText()} home={false}>
      {notFound
      ? <div>404 : Not Found</div>
      : <div>
        { Object.keys(schedule).length
        ? <ScheduleView schedule={schedule} onUpdate={setSchedule}/>
        : <CircularProgress />
        }
        </div>
      }
    </Layout>
  )
}