import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PublicRoute = ({
  component: Component,
  isAuthenticated,
  ...otherProps
}) => (
  <Route
    {...otherProps}
    render={(routeProps) =>
      !isAuthenticated ? (
        <Component {...routeProps} />
      ) : (
        <Redirect to="/dashboard" />
      )
    }
  />
);

const mapStateToProps = ({ auth: { isAuthenticated } }) => ({
  isAuthenticated,
});

export default connect(mapStateToProps)(PublicRoute);
