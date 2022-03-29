import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useStore } from "../Store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function Login() {
  const { search } = useLocation();
  const redirectURL = new URLSearchParams(search).get("redirect");
  console.log(redirectURL);
  const { state3, dispatch3 } = useStore();

  console.log(state3);
  console.log(redirectURL);

  let redirect = redirectURL ? redirectURL : "/";

  // console.log(redirect);
  const [isMember, setIsMember] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  console.log(name, email, password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isMember) {
      if (!email || !password) {
        return toast("Fill out all the forms");
      }
      dispatch3({ type: "LOGIN_BEGIN" });
      try {
        const { data } = await axios.post(`/users/login`, {
          email,
          password,
        });
        localStorage.setItem("userInfo", JSON.stringify(data));

        if (data) {
          navigate(`/${redirect}`);
        }
        dispatch3({
          type: "LOGIN_SUCCESS",
          payload: { email, password },
        });
      } catch (error) {
        dispatch3({
          type: "LOGIN_FAIL",
          payload: { error: error.response.data.msg },
        });
        toast.error(error.response.data.msg);
      }
    }
  };
  return (
    <Container>
      {state3.loading ? toast.warning("Please wait !!!") : ""}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
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
                  onChange={(e) => setName(e.target.value)}
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
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group my-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              className="btn btn-dark btn-md w-100 btn-block my-3"
              onClick={handleSubmit}
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
