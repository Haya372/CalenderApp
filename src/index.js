import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import IndexPage from "./pages/index.jsx";
import AddPage from "./pages/add.jsx";
import LoginPage from "./pages/login.jsx";
import Header from "./components/Header.jsx";
import { Provider } from "react-redux";
import store from './store/index.js';
import './styles.css';

const Index = () => {
  const [user_info, setUserInfo] = useState({});

  return (
    <Provider store={store}>
      <Router>
        <Header/>
        <Route exact path="/">
          <IndexPage user={user_info}/>
        </Route>
        <Route path="/add">
          <AddPage user={user_info} />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <div id="modal" />
      </Router>
    </Provider>
  )
  ;
};

ReactDOM.render(<Index />, document.getElementById("index")); 