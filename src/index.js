import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import liff from '@line/liff';
import axios from 'axios';

const Index = () => {

  console.log(process.env.LIFF_ID);

  const [profile, setProfile] = useState('noprofile')
  useEffect(() => {
    liff.init({liffId: process.env.LIFF_ID}).then(() => {
      if(!liff.isLoggedIn()){
        liff.login({});
      }
    })
  }, [])

  const onClick = () => {
    axios.get('/api/').then(res => {
      console.log(res);
      alert(res.data);
    });
  }

  const showProfile = () => {
    liff.init({liffId: process.env.LIFF_ID}).then(() => {
      if(!liff.isLoggedIn()){
        liff.login({});
      }else{
        liff.getProfile().then(profile => {
          setProfile(profile.displayName);
        });
      }
    })
  }
  
  return (
    <div>
      <h1>Hello React!</h1>
      <div>user: {profile}</div>
      <div><button onClick={showProfile}>show profile</button></div>
      <button onClick={onClick}>API test</button>
    </div>
  )
  ;
};

ReactDOM.render(<Index />, document.getElementById("index")); 