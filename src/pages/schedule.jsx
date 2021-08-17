import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import ScheduleView from "../components/ScheduleView.jsx";
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

export default function SchedulePage(props){
  const { id } = useParams();
  const [schedule, setSchedule] = useState({});
  const [notFound, setNotFound] = useState(false);
  const history = useHistory();

  useEffect(() => {
    axios.get('/api/schedules/' + id).then(res => {
      setSchedule(res.data);
    }).catch(err => {
      setNotFound(true);
    });
  }, []);

  const onClick = () => {
    history.push('/');
  }

  return (
    <div>
      {notFound
      ? <div>404 : Not Found</div>
      : <div>
        <Button
          startIcon={<ArrowBackIosIcon />}
          variant="outlined"
          color="primary"
          onClick={onClick}
        >ホームへ戻る</Button>
        { Object.keys(schedule).length
        ? <ScheduleView schedule={schedule} onUpdate={setSchedule}/>
        : <CircularProgress />
        }
        </div>
      }
    </div>
  )
}