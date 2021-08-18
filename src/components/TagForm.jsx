import React, { useState } from 'react';
import Modal from './Modal.jsx';
import styles from './TagForm.module.css';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
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
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
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

export default function TagForm(props){
  const [modal, setModal] = useState(false);
  const [tag, setTag] = useState(props.tag);
  const classes = useStyles();

  const showIcon = (tag) => {
    switch(tag){
      case 'sports':
        return <Avatar className={classes[tag]}><SportsHandballIcon/></Avatar>;
        break;
      case 'work':
        return <Avatar className={classes[tag]}><WorkIcon /></Avatar>;
        break;
      case 'school':
        return <Avatar className={classes[tag]}><SchoolIcon /></Avatar>;
        break;
      case 'hospital':
        return <Avatar className={classes[tag]}><LocalHospitalIcon /></Avatar>;
        break;
      case 'trip':
        return <Avatar className={classes[tag]}><AirplanemodeActiveIcon /></Avatar>;
        break;
      case 'important':
        return <Avatar className={classes[tag]}><PriorityHighIcon /></Avatar>;
        break;
      default:
        return <Avatar><ImageIcon /></Avatar>;
        break;
    }
  }

  const closeModal = (e) => {
    props.setTag(tag);
    setModal(e);
  }

  const onTagChange = (e, newTag) => {
    e.stopPropagation();
    setTag(newTag);
  }
  
  return (
    <div>
      {
        <div
          className={styles.icon}
          onClick={() => {
          if(!props.disabled){
            setModal(true);
          }
        }}>{showIcon(props.tag)}</div>
      }
      { modal
      ? <Modal setModal={closeModal}>
          <div className={styles.modalCenter}>
            <List>
              <ListItem button onClick={(e) => onTagChange(e, "school")} selected={tag === "school"}>
                <ListItemAvatar>
                  <Avatar className={classes.school}>
                    <SchoolIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="学校" />
              </ListItem>
              <ListItem button onClick={(e) => onTagChange(e, "work")} selected={tag === "work"}>
                <ListItemAvatar>
                  <Avatar className={classes.work}>
                    <WorkIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="仕事" />
              </ListItem>
              <ListItem button onClick={(e) => onTagChange(e, "sports")} selected={tag === "sports"}>
                <ListItemAvatar>
                  <Avatar className={classes.sports}>
                    <SportsHandballIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="運動" />
              </ListItem>
              <ListItem button onClick={(e) => onTagChange(e, "hospital")} selected={tag === "hospital"}>
                <ListItemAvatar>
                  <Avatar className={classes.hospital}>
                    <LocalHospitalIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="病院" />
              </ListItem>
              <ListItem button onClick={(e) => onTagChange(e, "trip")} selected={tag === "trip"}>
                <ListItemAvatar>
                  <Avatar className={classes.trip}>
                    <AirplanemodeActiveIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="旅行" />
              </ListItem>
              <ListItem button onClick={(e) => onTagChange(e, "important")} selected={tag === "important"}>
                <ListItemAvatar>
                  <Avatar className={classes.important}>
                    <PriorityHighIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="重要" />
              </ListItem>
            </List>
          </div>
      </Modal>
      : null
    }
    </div>
  )
}