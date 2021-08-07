import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import liff from '@line/liff';
import axios from 'axios';

const Index = () => {

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
        const access_token = liff.getAccessToken();
        axios.post('/api/login', { access_token: access_token }).then((res) => {
          console.log(res.data);
          setProfile(res.data.name);
        }).catch((err) => {
          console.log(err.message);
        })
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