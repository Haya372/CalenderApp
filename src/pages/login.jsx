import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { useDispatch } from "react-redux";
import liff from '@line/liff';
import { useHistory } from 'react-router';

export default function LoginPage() {
  const history = useHistory();

  const login = () => {
    liff.init({liffId: process.env.LIFF_ID}).then(() => {
      if(!liff.isLoggedIn()){
        liff.login({});
      }
      history.push('/');
    })
  }

  return (
  <div>
    <Button variant="contained" onClick={login}>LINEログイン</Button>
  </div>
  )
}