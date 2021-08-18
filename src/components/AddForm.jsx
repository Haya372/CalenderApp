import React, { useState } from "react";
import CustomCalendar from "./CustomCalender.jsx"
import TextField from '@material-ui/core/TextField';
import styles from './AddForm.module.css';
import Button from '@material-ui/core/Button';
import axios from "axios";
import Modal from './Modal.jsx';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { useHistory } from "react-router";
import TagForm from "./TagForm.jsx";

export default function AddForm(props){
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [selectedDates, setSelectedDates] = useState([new Date()]);
  const [tag, setTag] = useState('None');
  const [memo, setMemo] = useState('');
  const [modal, setModal] = useState(false);
  const [titleValidation, setTitileValidation] = useState(false);

  const onClick = () => {
    // 提出処理
    const data = {
      title: title,
      dates: selectedDates,
      tag: tag,
      memo: memo
    }
    console.log('提出')
    axios.post('/api/schedules', { data: data }).then((res) => {
      setModal(true);
      setTag('');
      setTitle('');
      setMemo('');
      setSelectedDates([new Date()]);
    }).catch(err => {
      if(err.response.data === "Forbitton"){
        history.push('/login');
      }
      console.log(err.response);
    });
  }
  
  return (
    <div>
      <div className={styles.flexWrapper}>
        <TagForm setTag={setTag} tag={tag} />
        <div className={styles.flexGlow}>
          <TextField
            value={title}
            onChange={(e) => {
              setTitileValidation(e.target.value.length === 0);
              setTitle(e.target.value);
            }}
            label="タイトル"
            required
            fullWidth
            error={titleValidation}
          />
          </div>
      </div>
      <div className={styles.mt}>
        <CustomCalendar
          selectedDates={selectedDates}
          setSelectedDates={setSelectedDates}
          has_many={true}
        />
      </div>
      <div className={styles.mtLarge}>
        <TextField
          label="備考"
          multiline
          minRows={10}
          maxRows={10}
          value={memo}
          variant="outlined"
          fullWidth
          onChange={(e) => setMemo(e.target.value)}
        />
      </div>
      <div className={styles.buttonLayout}>
        <Button
          onClick={onClick}
          variant="contained"
          color="primary"
          disabled={title.length === 0 || selectedDates.length === 0}
        >
          作成する
        </Button>
      </div>
      {modal
      ? <Modal setModal={setModal}>
          <div className={styles.modalCenter}>
            <Card>
              <CardContent>
                新しい予定を追加しました。
              </CardContent>
              <div className={styles.modalButtonsWrapper}>
                <Button
                  onClick={() => history.push('/')}
                  variant="outlined"
                  color="primary"
                  size="small"
                  startIcon={<ArrowBackIosIcon />}
                >
                  ホームへ戻る
                </Button>
                <Button
                  onClick={() => setModal(false)}
                  variant="outlined"
                  color="primary"
                  size="small"
                  endIcon={<ArrowForwardIosIcon/>}
                >
                  続けて入力する
                </Button>
              </div>
            </Card>
          </div>
      </Modal>
      : null}
    </div>
  )
}