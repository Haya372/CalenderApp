import React, { useState } from 'react';
import { useSelector } from "react-redux";
import Layout from '../components/Layout.jsx';
import Avatar from '@material-ui/core/Avatar';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Button from '@material-ui/core/Button';
import styles from './user.module.css';

export default function UserPage(props){
  const name = useSelector((state) => state.user.name);
  const pictureUrl = useSelector((state) => state.user.pictureUrl);
  const notify = useSelector((state) => state.user.notify);
  const [username, setUsername] = useState(name);
  const [isLocked, setIsLocked] = useState(true);
  const [lineNotify, setLineNotify] = useState(notify);

  const onClick = () => {
    // 変更処理を追記
    console.log('変更')
  }

  const onClickCancel = () => {
    setUsername(name);
    setLineNotify(lineNotify);
    setIsLocked(true);
  }

  return(
    <Layout>
      <div className={styles.lock}>
        <Checkbox
          checked={isLocked}
          icon={<LockOpenIcon />}
          checkedIcon={<LockIcon />}
          onChange={(e) => {
            if(e.target.checked) onClickCancel();
            setIsLocked(e.target.checked)
          }}
        />
      </div>
      <div className={styles.flexWrapper}>
        <Avatar alt="user_avatar" src={pictureUrl} />
        <div className={styles.username}>
          <TextField
            value={username}
            onChange={e => setUsername(e.target.value)}
            label="ユーザー名"
            InputProps={{
              readOnly: isLocked,
            }}
            fullWidth
            error={username.length === 0}
          />
        </div>
      </div>
      <div className={styles.flexCenter}>
        <Checkbox
          onChange={e => setLineNotify(e.target.checked)}
          color="primary"
          value={lineNotify}
          disabled={isLocked}
        />
        <span className={isLocked ? styles.checkboxLocked : null}>LINEでの通知を有効化</span>
      </div>
      { isLocked 
        ? null
        : <div className={styles.buttonLayout}>
          <Button
            onClick={onClick}
            variant="outlined"
            color="primary"
            disabled={username.length === 0}
            endIcon={<ArrowForwardIosIcon/>}
          >
            変更
          </Button>
          <Button
            onClick={onClickCancel}
            variant="outlined"
            color="primary"
            endIcon={<ArrowForwardIosIcon/>}
          >
            キャンセル
          </Button>
          </div>
        }
    </Layout>
  )
}