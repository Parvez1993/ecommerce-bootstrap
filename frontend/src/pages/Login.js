import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";

function Login() {
  const { search } = useLocation();
  const redirectURL = new URLSearchParams(search).get("redirect");
  // console.log(redirectURL);
  let redirect = redirectURL ? redirectURL : "/";

  console.log(redirect);
  const [isMember, setIsMember] = useState(true);
  return (
    <Container>
      <div className="login">
        <div className="w-50 mx-auto border rounded">
          <form className="p-3">
            <h3 className="text-center my-3">
              {isMember ? "Sign in" : "Register"}
            </h3>

            {!isMember ? (
              <div className="form-group">
                <label>Name</label>
                <input
                  type="name"
                  className="form-control"
                  placeholder="Enter name"
                />
              </div>
            ) : (
              ""
            )}
            <div className="form-group my-3">
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
              {!isMember ? "Register" : "Sign in"}
            </button>
            <p className="text-right" onClick={() => setIsMember(!isMember)}>
              {isMember
                ? "Don't have an account? Click here"
                : "Already have an account click here"}
              {/* <a href={`/signup?redirect=${redirect}`}>password?</a> */}
            </p>
          </form>
        </div>
      </div>
    </Container>
  );
}

export default Login;
