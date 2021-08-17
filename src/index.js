import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import IndexPage from "./pages/index.jsx";
import AddPage from "./pages/add.jsx";
import LoginPage from "./pages/login.jsx";
import SchedulePage from "./pages/schedule.jsx";
import { Provider } from "react-redux";
import store from './store/index.js';
import './styles.css';

const Index = () => {
  return (
    <Provider store={store}>
      <Router>
        <Route exact path="/">
          <IndexPage/>
        </Route>
        <Route path="/add">
          <AddPage/>
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/schedule/:id">
          <SchedulePage />
        </Route>
        <div id="modal" />
      </Router>
    </Provider>
  )
  ;
};

ReactDOM.render(<Index />, document.getElementById("index")); 