import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { toast, ToastContainer } from "react-toastify";

function Shipping() {
  const [fullname, setFullname] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postCode, setPostCode] = useState("");
  const [country, setCountry] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if ((!fullname, !address, !city, !postCode, !country, !phoneNumber)) {
      return toast.warning("Fill the Enter Form");
    }
  };
  return (
    <>
      <Helmet>
        <title>Shipping</title>
      </Helmet>
      <Container>
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
              <h3 className="text-center my-3">Shipping Form</h3>

              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="full name"
                  onChange={(e) => setFullname(e.target.value)}
                  required
                />
              </div>

              <div className="form-group my-3">
                <label>Address</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="address"
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
              <div className="form-group my-3">
                <label>Phone Number</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Phone number"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>
              <div className="form-group my-3">
                <label>City</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="city"
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </div>
              <div className="form-group my-3">
                <label>Postal Code</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="postCode"
                  onChange={(e) => setPostCode(e.target.value)}
                  required
                />
              </div>
              <div className="form-group my-3">
                <label>Country</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Country"
                  onChange={(e) => setCountry(e.target.value)}
                  required
                />
              </div>

              <button
                className="btn btn-dark btn-md w-100 btn-block my-3"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </Container>
      ;
    </>
  );
}

export default Shipping;
