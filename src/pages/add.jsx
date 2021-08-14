import React, { useEffect, useState } from "react";
import AddForm from "../components/AddForm.jsx";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";

export default function AddPage(props){
  const history = useHistory();

  const onClick = () => {
    history.push('/')
  }

  return (
    <div>
      <div>
        <Button
          startIcon={<ArrowBackIosIcon />}
          variant="outlined"
          color="primary"
          onClick={onClick}
        >
          ホームへ戻る
        </Button>
      </div>
      <AddForm></AddForm>
    </div>
  )
}