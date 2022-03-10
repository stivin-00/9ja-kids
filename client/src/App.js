import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import { signout } from "./actions/userActions";
import Login from "./pages/SigninScreen";
import Register from "./pages/RegisterScreen";
import Home from "./pages/HomeScreen";
import picc from "./images/logo.png";

function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };
  return (
    <BrowserRouter>
      <header className="site-header">
        <div className="container">
          <div  className="branding">
            <img src={picc} alt="" className="logo" />
            <h1 className="site-title">True Church</h1>
          </div>

          <div className="main-navigation row">
            <ul className="menu row">
              <li className="menu-item current-menu-item">
                <Link className="site-title" to="/">home</Link>
              </li>
              <li className="menu-item">
                <Link className="site-title"to="/register">sign up</Link>
              </li>
              <li className="menu-item">
                <Link className="site-title" to="/login">sign in</Link>
              </li>
              <li className="menu-item">
                <button type="submit" onClick={signoutHandler}>
                  signout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </header>
      <Switch>
        <Route path="/login" component={Login} exact />
        <Route path="/register" component={Register} exact />
        <Route path="/" component={Home} exact />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
