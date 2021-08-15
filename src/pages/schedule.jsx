import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import ScheduleView from "../components/ScheduleView.jsx";
import CircularProgress from '@material-ui/core/CircularProgress';

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
  }, [])

  return (
    <div>
      {notFound
      ? <div>404 : Not Found</div>
      : <div>
        { Object.keys(schedule).length
        ? <ScheduleView schedule={schedule} />
        : <CircularProgress />
        }
        </div>
      }
    </div>
  )
}