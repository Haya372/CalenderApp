import React from 'react';
import Button from '@material-ui/core/Button';
import { useDispatch } from "react-redux";
import { setUser } from '../store/auth.js';
import liff from '@line/liff';
import axios from 'axios';
import { useHistory } from 'react-router';

export default function LoginPage() {
  const dispach = useDispatch();
  const history = useHistory();

  const login = () => {
    liff.init({liffId: process.env.LIFF_ID}).then(() => {
      if(!liff.isLoggedIn()){
        liff.login({});
      }
      if(liff.isLoggedIn()){
        liff.getProfile().then((profile) => {
          axios.post('/api/login', { line_id: profile.userId }).then((res) => {
            const user_info = res.data;
            dispach(setUser(user_info));
            history.push('/');
          }).catch((err) => {
            if(err.response.data === "Not found"){
              const access_token = "test" //liff.getAccessToken();
              axios.post('/api/login', { access_token: access_token, user_id: localStorage.getItem('user_id') }).then((res) => {
                const user_info = res.data;
                dispach(setUser(user_info));
                history.push('/');
              }).catch((err) => {
                console.log(err.message);
              })
            }
          })
        })
      }
    })
  }

  return (
  <div>
    <Button variant="contained" onClick={login}>LINEログイン</Button>
  </div>
  )
}