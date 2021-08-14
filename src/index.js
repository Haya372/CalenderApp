import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import liff from '@line/liff';
import axios from 'axios';
import { BrowserRouter as Router, Route } from "react-router-dom";
import IndexPage from "./pages/index.jsx";
import AddPage from "./pages/add.jsx";
import Header from "./components/Header.jsx";
import './styles.css';

const Index = () => {
  const [user_info, setUserInfo] = useState({});

  const login = () => {
    liff.init({liffId: process.env.LIFF_ID}).then(() => {
      if(!liff.isLoggedIn()){
        liff.login({});
      }
      if(liff.isLoggedIn()){
        const access_token = "test" //liff.getAccessToken();
        axios.post('/api/login', { access_token: access_token, user_id: localStorage.getItem('user_id') }).then((res) => {
          setUserInfo(res.data);
        }).catch((err) => {
          console.log(err.message);
        })
      }
    })
  }

  return (
    <Router>
      <Header user_data={user_info} login={login} />
      <Route exact path="/">
        <IndexPage user={user_info}/>
      </Route>
      <Route path="/add">
        <AddPage user={user_info} />
      </Route>
      <div id="modal" />
    </Router>
  )
  ;
};

ReactDOM.render(<Index />, document.getElementById("index")); 