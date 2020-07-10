import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import { loadMe } from "../actions/authActions";
import Navbar from "./layout/navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";

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
          <Route exact path="/" component={Landing} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/dashboard" component={Dashboard} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default connect(null, { loadMe })(App);
