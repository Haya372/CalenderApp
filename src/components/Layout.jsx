import React from 'react';
import styles from './Layout.module.css';
import Header from './Header.jsx';
import { useHistory } from 'react-router';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

export default function Layout(props){
  const history = useHistory();

  return (
    <div className={styles.body}>
      <Header text={props.header}/>
      <div className={styles.main}>
        <div className={styles.navigate}>
          { props.home
          ? <Button
              startIcon={<AddIcon />}
              variant="outlined"
              color="primary"
              onClick={() => history.push('/add')}
            >
              新規作成
            </Button>
          : <Button
              startIcon={<ArrowBackIosIcon />}
              variant="outlined"
              color="primary"
              onClick={() => history.push('/')}
            >
              ホームへ
            </Button>
          }
        </div>
        <div className={styles.contents}>
          {props.children}
        </div>
      </div>
    </div>
  )
}