import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import { useStore } from "../Store";
function Vendor() {
  const [agree, setAgree] = useState(false);
  const { state3 } = useStore();

  const { userInfo } = state3;

  console.log(userInfo);
  useEffect(() => {
    const editVender = async (id) => {
      console.log(id);
      const { data } = await axios.put(
        "/users/editvendor",
        {},
        {
          headers: { Authorization: "Bearer " + id },
        }
      );
    };

    if (agree) {
      editVender(state3.userInfo.token);
      setAgree(false);
    }
  }, [agree]);
  return (
    <Container>
      <div className="d-flex justify-content-center">
        {" "}
        <div class="page">
          <div id="terms-and-conditions">
            <h1>Terms & Conditions</h1>
            <ol>
              <li>
                <b>INTELLECTUAL PROPERTY, LICENCE AND RESTRICTIONS</b>
                <ol>
                  <li>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                    vitae elementum ipsum. Nam eget congue libero. Donec at elit
                    eget ante pulvinar dictum ac in lorem. Sed sed molestie mi,
                    sit amet convallis erat. Aliquam eu sagittis nulla. Nulla id
                    mollis dolor. Pellentesque sagittis odio a blandit
                    ultricies.
                  </li>
                  <li>
                    Subject to your compliance with these Terms, the Developer
                    grants you a limited, non-exclusive, revocable,
                    non-transferrable licence to:
                    <ol>
                      <li>
                        lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Ut vitae elementum ipsum. Nam eget congue libero. Donec
                        at elit eget ante pulvinar dictum ac in lorem. Sed sed
                        molestie mi, sit amet convallis erat. Aliquam eu
                        sagittis nulla. Nulla id mollis dolor. Pellentesque
                        sagittis odio a blandit ultricies.
                      </li>
                      <li>
                        lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Ut vitae elementum ipsum. Nam eget congue libero. Donec
                        at elit eget ante pulvinar dictum ac in lorem. Sed sed
                        molestie mi, sit amet convallis erat. Aliquam eu
                        sagittis nulla. Nulla id mollis dolor. Pellentesque
                        sagittis odio a blandit ultricies.
                      </li>
                    </ol>
                  </li>
                  <li>
                    Any rights not expressly granted herein are reserved by the
                    Developer.
                  </li>
                  <li>You may not:</li>
                  <ol>
                    <li>
                      etiam quis purus eget tortor efficitur tempor. Sed
                      volutpat, dolor in porta aliquam, quam enim accumsan dui.
                    </li>
                    <li>
                      etiam quis purus eget tortor efficitur tempor. Sed
                      volutpat, dolor in porta aliquam, quam enim accumsan dui.
                    </li>
                    <li>
                      etiam quis purus eget tortor efficitur tempor. Sed
                      volutpat, dolor in porta aliquam, quam enim accumsan dui.
                    </li>
                    <li>
                      etiam quis purus eget tortor efficitur tempor. Sed
                      volutpat, dolor in porta aliquam, quam enim accumsan dui.
                    </li>
                    <li>
                      etiam quis purus eget tortor efficitur tempor. Sed
                      volutpat, dolor in porta aliquam, quam enim accumsan dui.
                    </li>
                    <li>
                      praesent sagittis pharetra justo vehicula tincidunt. Cras
                      ut augue non massa gravida porttitor at et dolor. Ut dolor
                      urna, fringilla eu auctor vel, tristique et turpis.
                      Vestibulum nec massa ac nisi dignissim egestas. Vestibulum
                      non malesuada urna. In hac habitasse platea dictumst.
                      Vestibulum vel leo mattis, efficitur lorem et, rutrum
                      velit. Cras venenatis semper diam, non tempor eros luctus
                      ut. Aenean id diam orci. Praesent a nisl vehicula, aliquam
                      odio id, mattis velit.
                    </li>
                  </ol>
                </ol>
              </li>
            </ol>
            <li>
              <b>INTELLECTUAL PROPERTY, LICENCE AND RESTRICTIONS</b>
              <ol>
                <li>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                  vitae elementum ipsum. Nam eget congue libero. Donec at elit
                  eget ante pulvinar dictum ac in lorem. Sed sed molestie mi,
                  sit amet convallis erat. Aliquam eu sagittis nulla. Nulla id
                  mollis dolor. Pellentesque sagittis odio a blandit ultricies.
                </li>
                <li>
                  Subject to your compliance with these Terms, the Developer
                  grants you a limited, non-exclusive, revocable,
                  non-transferrable licence to:
                  <ol>
                    <li>
                      lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Ut vitae elementum ipsum. Nam eget congue libero. Donec at
                      elit eget ante pulvinar dictum ac in lorem. Sed sed
                      molestie mi, sit amet convallis erat. Aliquam eu sagittis
                      nulla. Nulla id mollis dolor. Pellentesque sagittis odio a
                      blandit ultricies.
                    </li>
                    <li>
                      lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Ut vitae elementum ipsum. Nam eget congue libero. Donec at
                      elit eget ante pulvinar dictum ac in lorem. Sed sed
                      molestie mi, sit amet convallis erat. Aliquam eu sagittis
                      nulla. Nulla id mollis dolor. Pellentesque sagittis odio a
                      blandit ultricies.
                    </li>
                  </ol>
                </li>
                <li>
                  Any rights not expressly granted herein are reserved by the
                  Developer.
                </li>
                <li>You may not:</li>
                <ol>
                  <li>
                    etiam quis purus eget tortor efficitur tempor. Sed volutpat,
                    dolor in porta aliquam, quam enim accumsan dui.
                  </li>
                  <li>
                    etiam quis purus eget tortor efficitur tempor. Sed volutpat,
                    dolor in porta aliquam, quam enim accumsan dui.
                  </li>
                  <li>
                    etiam quis purus eget tortor efficitur tempor. Sed volutpat,
                    dolor in porta aliquam, quam enim accumsan dui.
                  </li>
                  <li>
                    etiam quis purus eget tortor efficitur tempor. Sed volutpat,
                    dolor in porta aliquam, quam enim accumsan dui.
                  </li>
                  <li>
                    etiam quis purus eget tortor efficitur tempor. Sed volutpat,
                    dolor in porta aliquam, quam enim accumsan dui.
                  </li>
                  <li>
                    praesent sagittis pharetra justo vehicula tincidunt. Cras ut
                    augue non massa gravida porttitor at et dolor. Ut dolor
                    urna, fringilla eu auctor vel, tristique et turpis.
                    Vestibulum nec massa ac nisi dignissim egestas. Vestibulum
                    non malesuada urna. In hac habitasse platea dictumst.
                    Vestibulum vel leo mattis, efficitur lorem et, rutrum velit.
                    Cras venenatis semper diam, non tempor eros luctus ut.
                    Aenean id diam orci. Praesent a nisl vehicula, aliquam odio
                    id, mattis velit.
                  </li>
                </ol>
              </ol>
            </li>
          </div>
        </div>
      </div>

      {userInfo ? (
        userInfo.data.user.isVendor ? (
          <h5 className="text-center">You are already a member</h5>
        ) : (
          <div className="d-flex justify-content-center">
            <div className="form-group form-check my-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
                onClick={() => setAgree(!agree)}
                required
              />
              <label className="form-check-label" for="exampleCheck1">
                <h5>I Agree with Terms & Condition</h5>
              </label>
            </div>
          </div>
        )
      ) : (
        <h5 className="text-center pb-3">Please login First</h5>
      )}
    </Container>
  );
}

export default Vendor;
