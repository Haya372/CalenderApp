import React, { useState } from "react";
import CustomCalendar from "./CustomCalender.jsx"
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from "axios";
import Modal from './Modal.jsx';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { useHistory } from "react-router";
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';
import styles from './ScheduleView.module.css'

export default function ScheduleView(props){
  const history = useHistory();
  const [title, setTitle] = useState(props.schedule.title);
  const [selectedDates, setSelectedDates] = useState([new Date(props.schedule.start_at)]);
  const [tag, setTag] = useState(props.schedule.tag);
  const [memo, setMemo] = useState(props.schedule.memo);
  const [modal, setModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [isLocked, setIsLocked] = useState(true);

  const onClick = () => {
    // 変更処理
    const data = {
      title: title,
      start_at: selectedDates[0].getTime(),
      tag: tag,
      memo: memo
    };
    // 変更処理に書き換える
    axios.patch('/api/schedules/' + props.schedule.id, { data: data }).then((res) => {
      setModal(true);
      props.onUpdate(res.data.data);
    }).catch(err => {
      if(err.response.data === "Forbitton"){
        history.push('/login');
      }
      console.log(err.response);
    });
  }

  const onClickCancel = () => {
    setTitle(props.schedule.title);
    setSelectedDates([new Date(props.schedule.start_at)]);
    setTag(props.schedule.tag);
    setMemo(props.schedule.memo);
    setIsLocked(true);
  }
  
  return (
    <div>
      <div>
        <div className={styles.flexWrapper}>
          <Checkbox
            checked={isLocked}
            icon={<LockOpenIcon />}
            checkedIcon={<LockIcon />}
            onChange={(e) => setIsLocked(e.target.checked)}
          />
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<DeleteIcon />}
            onClick={() => setConfirmModal(true)}
            disabled={isLocked}
          >
            削除
          </Button>
        </div>
        <div className={styles.mt}>
          <TextField
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            label="タイトル"
            InputProps={{
              readOnly: isLocked,
            }}
            required
            fullWidth
          />
        </div>
        <div className={styles.mt}>
          <CustomCalendar
            selectedDates={selectedDates}
            setSelectedDates={setSelectedDates}
            disabled={isLocked}
            has_many={false}
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
            InputProps={{
              readOnly: isLocked,
            }}
          />
        </div>
        { isLocked 
        ? null
        : <div className={styles.buttonLayout}>
          <Button
            onClick={onClick}
            variant="outlined"
            color="primary"
            disabled={title.length === 0 || selectedDates.length === 0}
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
      </div>
      {modal
      ? <Modal setModal={setModal}>
          <div className={styles.modalCenter}>
            <Card>
              <CardContent>
                新しい予定を変更しました。
              </CardContent>
              <div className={styles.modalButtonsWrapper}>
                <Button
                  onClick={() => history.push('/')}
                  variant="outlined"
                  color="primary"
                  size="small"
                  startIcon={<ArrowBackIosIcon />}
                >
                  ホームへ
                </Button>
                <Button
                  onClick={() => setModal(false)}
                  variant="outlined"
                  color="primary"
                  size="small"
                  endIcon={<ArrowForwardIosIcon/>}
                >
                  閉じる
                </Button>
              </div>
            </Card>
          </div>
      </Modal>
      : null}
      {confirmModal
      ? <Modal setModal={setModal}>
          <div className={styles.modalCenter}>
            <Card>
              <CardContent>
                本当に削除しますか？
              </CardContent>
              <div className={styles.modalButtonsWrapper}>
                <Button
                  onClick={() => {
                    axios.delete('/api/schedules/' + props.schedule.id).then(res => {
                      history.push('/');
                    }).catch((err) => {
                      console.log(err);
                      alert('サーバーエラーが発生しました');
                      setConfirmModal(true);
                    });
                  }}
                  variant="outlined"
                  color="primary"
                  size="small"
                  endIcon={<ArrowForwardIosIcon/>}
                >
                  削除する
                </Button>
                <Button
                  onClick={() => setConfirmModal(false)}
                  variant="outlined"
                  color="primary"
                  size="small"
                  endIcon={<ArrowForwardIosIcon/>}
                >
                  閉じる
                </Button>
              </div>
            </Card>
          </div>
      </Modal>
      : null}
    </div>
  )
}