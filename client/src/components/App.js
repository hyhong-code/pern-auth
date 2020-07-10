import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import { loadMe } from "../actions/authActions";
import Navbar from "./layout/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import "./App.css";

const App = ({ loadMe }) => {
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      (async () => {
        loadMe();
      })();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <div className="container py-5">
        <Switch>
          <PublicRoute exact path="/" component={Landing} />
          <PublicRoute exact path="/login" component={Login} />
          <PublicRoute exact path="/signup" component={Signup} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default connect(null, { loadMe })(App);
