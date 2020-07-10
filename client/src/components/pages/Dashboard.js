import React, { Fragment } from "react";
import { connect } from "react-redux";

import Spinner from "../layout/Spinner";

const Dashboard = ({ user }) => {
  return user ? (
    <Fragment>
      <h1>Dashboard</h1>
      <p className="lead">Hello, {user.user_name}</p>
    </Fragment>
  ) : (
    <Spinner />
  );
};

const mapStateToProps = ({ auth: { user } }) => ({ user });

export default connect(mapStateToProps)(Dashboard);
