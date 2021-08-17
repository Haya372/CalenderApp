import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import styles from './ScheduleList.module.css';
import Divider from '@material-ui/core/Divider';
import { useHistory } from 'react-router';

const formatTime = (date) => {
  let hour = date.getHours();
  if(hour < 10) hour = '0' + hour;
  let minute = date.getMinutes();
  if(minute < 10) minute = '0' + minute;
  return `${hour}:${minute}`;
}

export default function ScheduleList(props){
  const history = useHistory();

  return (
    <div className={styles.wrapper}>
      {props.schedules.map((item) => {

        const onClick = (e) => {
          e.stopPropagation();
          history.push('/schedule/' + item.id);
        }
        
        const date = new Date(item.start_at);
        
        return (
          <div key={item.id} onClick={onClick} className={styles.card}>
            <Card>
              <CardContent>
                <div className={styles.flexWrapper}>
                  <div className={styles.time}>
                    {formatTime(date)}<br />
                    ~
                  </div>
                  <Divider orientation="vertical" flexItem/>
                  <div className={styles.content}>
                    <div className={styles.title}>
                      {item.title}
                    </div>
                    <Divider />
                    <div className={styles.label}>
                      備考
                    </div>
                    <div className={styles.memo}>
                    {item.memo
                    ? item.memo
                    : <br/>
                    }
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      })}
    </div>
  )
}