import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import styles from './ScheduleList.module.css';
import Divider from '@material-ui/core/Divider';
import { useHistory } from 'react-router';
import Avatar from '@material-ui/core/Avatar';
import SchoolIcon from '@material-ui/icons/School';
import SportsHandballIcon from '@material-ui/icons/SportsHandball';
import WorkIcon from '@material-ui/icons/Work';
import ImageIcon from '@material-ui/icons/Image';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import AirplanemodeActiveIcon from '@material-ui/icons/AirplanemodeActive';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  small: {
    marginBottom: "8px"
  },
  sports: {
    backgroundColor: "#03a9f4",
  },
  work: {
    backgroundColor: "#03a9f4",
  },
  hospital: {
    backgroundColor: "red"
  },
  school: {
    backgroundColor: "#03a9f4",
  },
  trip: {
    backgroundColor: "#03a9f4",
  },
  important: {
    backgroundColor: "red"
  }
}));

const formatTime = (date) => {
  let hour = date.getHours();
  if(hour < 10) hour = '0' + hour;
  let minute = date.getMinutes();
  if(minute < 10) minute = '0' + minute;
  return `${hour}:${minute}`;
}

export default function ScheduleList(props){
  const history = useHistory();

  const classes = useStyles();

  const showIcon = (tag) => {
    switch(tag){
      case 'sports':
        return <Avatar className={`${classes[tag]} ${classes.small}`}><SportsHandballIcon/></Avatar>;
        break;
      case 'work':
        return <Avatar className={`${classes[tag]} ${classes.small}`}><WorkIcon /></Avatar>;
        break;
      case 'school':
        return <Avatar className={`${classes[tag]} ${classes.small}`}><SchoolIcon /></Avatar>;
        break;
      case 'hospital':
        return <Avatar className={`${classes[tag]} ${classes.small}`}><LocalHospitalIcon /></Avatar>;
        break;
      case 'trip':
        return <Avatar className={`${classes[tag]} ${classes.small}`}><AirplanemodeActiveIcon /></Avatar>;
        break;
      case 'important':
        return <Avatar className={`${classes[tag]} ${classes.small}`}><PriorityHighIcon /></Avatar>;
        break;
      default:
        return <Avatar className={classes.small}><ImageIcon/></Avatar>;
        break;
    }
  }

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
                    {showIcon(item.tag)}
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