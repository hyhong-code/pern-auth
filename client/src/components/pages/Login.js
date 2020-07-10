import React, { Fragment, useState } from "react";
import { connect } from "react-redux";

import { login } from "../../actions/authActions";

const Login = ({ history, login }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log(formData);
    login(formData);
  };

  const { email, password } = formData;

  return (
    <Fragment>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                onChange={handleChange}
                name="email"
                value={email}
                id="email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                onChange={handleChange}
                name="password"
                value={password}
                id="password"
              />
            </div>
            <input type="submit" className="btn btn-primary" value="Login" />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default connect(null, { login })(Login);
