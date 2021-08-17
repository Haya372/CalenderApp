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
  <Layout title="ログイン" home={false}>
    <Button variant="contained" onClick={login}>LINEログイン</Button>
  </Layout>
  )
}