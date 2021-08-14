import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AccountCircleTwoToneIcon from '@material-ui/icons/AccountCircleTwoTone';
import styles from './Header.module.css';


export default function Header(props) {

  const createAvatar = (user_data) => {
    if(user_data.pictureUrl){
      return (
        <Avatar alt="user_avatar" src={user_data.pictureUrl} />
      )
    }
    return <AccountCircleTwoToneIcon />
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={styles.title}>
            Header
          </Typography>
          { Object.keys(props.user_data).length > 0
          ? createAvatar(props.user_data)
          : <Button color="inherit" onClick={props.login}>ログイン</Button>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}