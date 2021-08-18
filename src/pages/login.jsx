import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import liff from '@line/liff';
import { useHistory } from 'react-router';
import Layout from '../components/Layout.jsx';

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
  <Layout header="ログイン" home={false}>
    <div style={{textAlign: "center", color: "#4caf50"}}>
      <Button
        variant="outlined"
        onClick={login}
        color="inherit"
      >LINEログイン</Button>
    </div>
  </Layout>
  )
}