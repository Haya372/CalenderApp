import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AccountCircleTwoToneIcon from '@material-ui/icons/AccountCircleTwoTone';
import styles from './Header.module.css';
import { useSelector } from "react-redux";
import Avatar from '@material-ui/core/Avatar';
import { useHistory } from 'react-router';


export default function Header(props) {
  const pictureUrl = useSelector(state => state.user.pictureUrl);
  const history = useHistory();

  const createAvatar = () => {
    if(pictureUrl){
      return (
        <Avatar alt="user_avatar" src={pictureUrl} />
      )
    }
    return <AccountCircleTwoToneIcon />
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={styles.title}>
            {props.text}
          </Typography>
          { pictureUrl
          ? createAvatar()
          : <Button color="inherit" onClick={() => history.push('/login')}>ログイン</Button>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}