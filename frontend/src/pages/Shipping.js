import React, { useState } from "react";
import { Container, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import ConfirmationSteps from "../components/ConfirmationSteps";
import { useStore } from "../Store";

function Shipping() {
  const { state4, dispatch4 } = useStore();

  const [fullname, setFullname] = useState(state4.shippingInfo?.fullname);
  const [address, setAddress] = useState(state4.shippingInfo?.address);
  const [city, setCity] = useState(state4.shippingInfo?.city);
  const [postCode, setPostCode] = useState(state4.shippingInfo?.postCode);
  const [country, setCountry] = useState(state4.shippingInfo?.country);
  const [phoneNumber, setPhoneNumber] = useState(
    state4.shippingInfo?.phoneNumber
  );

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !fullname &&
      !address &&
      !city &&
      !postCode &&
      !country &&
      !phoneNumber
    ) {
      return toast.warning("Fill the Enter Form");
    }

    dispatch4({ type: "SHIPPING_BEGIN" });

    try {
      dispatch4({
        type: "SHIPPING_SUCCESS",
        payload: { fullname, address, city, postCode, country, phoneNumber },
      });
      localStorage.setItem(
        "shippingInfo",
        JSON.stringify({
          fullname,
          address,
          city,
          postCode,
          country,
          phoneNumber,
        })
      );
      navigate("/payment");
    } catch (error) {
      dispatch4({
        type: "SHIPPING_FAIL",
        payload: { error: error.response.data.msg },
      });
    }
  };
  return (
    <>
      <Helmet>
        <title>Shipping</title>
      </Helmet>
      <ConfirmationSteps
        checkout={true}
        payment={false}
        confirm={false}
      ></ConfirmationSteps>
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
                  value={fullname}
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
                  value={address}
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
                  value={phoneNumber}
                />
              </div>
              <div className="form-group my-3">
                <label>City</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="city"
                  onChange={(e) => setCity(e.target.value)}
                  value={city}
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
                  value={postCode}
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
                  value={country}
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
