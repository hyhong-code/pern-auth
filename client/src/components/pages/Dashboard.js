import React, { Fragment } from "react";
import { connect } from "react-redux";

const Dashboard = ({ history, user }) => {
  console.log(history);
  return user ? (
    <Fragment>
      <h1>Dashboard</h1>
      <p className="lead">Hello, {user.user_name}</p>
    </Fragment>
  ) : (
    <h1>Loading...</h1>
  );
};

const mapStateToProps = ({ auth: { user } }) => ({ user });

export default connect(mapStateToProps)(Dashboard);
