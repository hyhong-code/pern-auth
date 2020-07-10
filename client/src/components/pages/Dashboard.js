import React, { Fragment } from "react";

const Dashboard = ({ history }) => {
  console.log(history);
  return (
    <Fragment>
      <h1>Dashboard</h1>
      <p className="lead">Hello, John Doe</p>
    </Fragment>
  );
};

export default Dashboard;
