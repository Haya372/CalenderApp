import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import liff from '@line/liff';
import axios from 'axios';
import { BrowserRouter as Router, Route } from "react-router-dom";
import IndexPage from "./pages/index.jsx";
import AddPage from "./pages/add.jsx";

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
    <Router>
      <h1>Hello React!</h1>
      <div>user: {profile}</div>
      <div><button onClick={showProfile}>show profile</button></div>
      <button onClick={onClick}>API test</button>
      <Route exact path="/">
        <IndexPage name={profile}/>
      </Route>
      <Route path="/add">
        <AddPage name={profile} />
      </Route>
    </Router>
  )
  ;
};

ReactDOM.render(<Index />, document.getElementById("index")); 