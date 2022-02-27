import React from "react";
import { Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";

function Login() {
  const { search } = useLocation();
  const redirectURL = new URLSearchParams(search).get("redirect");
  let redirect = redirectURL ? redirectURL : "/";

  console.log(redirect);
  return (
    <Container>
      <div className="login">
        <div className="w-50 mx-auto border rounded">
          <form className="p-3">
            <h3 className="text-center my-3">Log in</h3>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
              />
            </div>

            <div className="form-group my-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
              />
            </div>

            <button
              type="submit"
              className="btn btn-dark btn-md w-100 btn-block my-3"
            >
              Sign in
            </button>
            <p className="text-right">
              Don't have an account? Click here to create one{" "}
              <a href={`/signup?redirect=${redirect}`}>password?</a>
            </p>
          </form>
        </div>
      </div>
    </Container>
  );
}

export default Login;
