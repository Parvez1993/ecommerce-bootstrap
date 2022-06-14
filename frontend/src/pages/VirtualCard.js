import React, { useEffect, useState } from "react";
import { Button, Container, Image } from "react-bootstrap";
import axios from "axios";
import { useStore } from "../Store";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

function VirtualCard() {
  const [vcprice, setPrice] = useState("");
  const { state3 } = useStore();
  // paypal step 1
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  useEffect(() => {
    const loadPayPalScript = async () => {
      const { data } = await axios.get("/keys/paypal", {
        headers: {
          authorization: `Bearer ${state3.userInfo.token}`,
        },
      });

      paypalDispatch({
        type: "resetOptions",
        value: {
          "client-id": data,
          currency: "USD",
        },
      });
      paypalDispatch({
        type: "setLoadingStatus",
        value: "pending",
      });
    };

    loadPayPalScript();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state3.userInfo]);

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: 1000,
              currency_code: "USD",
            },
          },
        ],
      })
      .then((orderID) => {
        console.log(orderID);
        return orderID;
      });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(async (details) => {
      try {
        const { data } = await axios.put(
          `vpayment/payment`,
          details.purchase_units[0],
          {
            headers: {
              authorization: `Bearer ${state3.userInfo.token}`,
            },
          }
        );

        window.alert("Congrats buddy lets celebrate");
      } catch (error) {
        window.alert(error.message);
      }
    });
  };

  const onError = (err) => {
    window.alert(err.message);
  };

  return (
    <>
      <Image
        src="https://av.sc.com/in/content/images/virtual-credit-card-1536x470.jpg"
        alt="vcard"
        fluid
      />
      <Container>
        <div style={{ padding: "100px 0" }}>
          {" "}
          <div>
            <h5 className="text-center">Read Before Applying</h5>
          </div>
          <div
            style={{
              height: "200px",
              border: "1px solid #ccc",
              overflow: "auto",
              marginTop: "40px",
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            in auctor nisi. Fusce elit mauris, sagittis vel aliquam et, vehicula
            eget mi. Maecenas sollicitudin dolor non ante placerat, a luctus
            enim suscipit. Ut pellentesque lectus ut purus consequat imperdiet.
            Morbi ut elit at lectus porta faucibus. Aliquam est quam, tincidunt
            a metus et, tincidunt accumsan ex. Duis semper, ligula et rutrum
            congue, quam velit molestie elit, eu malesuada leo eros a eros.
            Interdum et malesuada fames ac ante ipsum primis in faucibus. Etiam
            et rutrum velit. Maecenas condimentum tortor ac erat iaculis
            fermentum. Maecenas sit amet varius dolor. Sed tincidunt diam urna,
            id laoreet purus consequat ac. Nunc lacinia, velit et bibendum
            imperdiet, velit odio maximus tortor, sit amet facilisis justo sem
            non nibh. Aenean at laoreet nisl, ac gravida urna. Fusce sagittis
            sapien massa, non vestibulum urna commodo a. Quisque eget erat
            tincidunt, tempus augue eu, pulvinar eros. Morbi sapien elit,
            viverra ac massa sit amet, suscipit faucibus dolor. Aliquam erat
            volutpat. Nunc efficitur blandit lectus, ut vestibulum tortor. Cras
            enim turpis, blandit at euismod quis, efficitur nec enim. Fusce eros
            nibh, egestas ac nibh id, consequat sollicitudin velit. Nullam at
            nisi erat. In malesuada, dui eu venenatis cursus, risus magna cursus
            sapien, vitae placerat risus eros eget augue. Phasellus sit amet
            lorem ante. Integer bibendum, elit cursus condimentum fringilla, sem
            eros efficitur sapien, id dapibus magna felis vitae erat. Praesent
            posuere purus a ex porttitor, id blandit nibh luctus. Suspendisse
            mauris nulla, hendrerit sit amet viverra nec, pharetra non diam.
            Donec vitae bibendum lorem. Mauris a est lectus. Lorem ipsum dolor
            sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Aliquam ligula enim, accumsan in sem
            eu, auctor eleifend lectus. Donec aliquet odio et lacus dapibus,
            quis vestibulum metus facilisis. Suspendisse suscipit libero lorem,
            non luctus erat sagittis ac. Donec ut lectus a nunc mattis cursus.
            Nullam in viverra quam, vel vulputate felis. Vestibulum ac nunc id
            justo dignissim sodales. Cras ut arcu nisi. Phasellus vitae mauris
            urna. Fusce neque enim, dignissim ut orci in, tempor fermentum
            risus. Aenean at porttitor elit. Aenean non ipsum enim. Fusce a ante
            augue. Sed ac fermentum dui, at vehicula ex. Sed vel justo eu tellus
            mattis feugiat ut vitae leo. Curabitur aliquet, ligula sit amet
            viverra pretium, mi ex sodales lorem, et placerat lorem elit a est.
            Cras bibendum lorem non dapibus tincidunt. In hac habitasse platea
            dictumst. Morbi quis ligula metus. Integer quis molestie magna.
            Mauris et odio sit amet quam finibus cursus. Curabitur vitae nisl ut
            turpis dictum semper non quis dolor. Nunc ullamcorper sem sed dictum
            dictum. Morbi sollicitudin, metus ut vestibulum consectetur, ex nibh
            scelerisque arcu, non dictum turpis sapien ac lorem. Mauris erat
            elit, ultricies a nunc nec, sollicitudin tempus lectus. Morbi
            tristique velit vel magna efficitur, at fermentum ex pharetra.
            Aenean a venenatis neque. Interdum et malesuada fames ac ante ipsum
            primis in faucibus.
          </div>
        </div>

        <div className="py-5" style={{ background: "#f2f5fa" }}>
          <h5 className="text-center my-5">Recharge 1000 For Virtual Card</h5>

          <div className="d-flex justify-content-center pb-4">
            <PayPalButtons
              createOrder={createOrder}
              onApprove={onApprove}
              onError={onError}
            />
          </div>
        </div>
      </Container>
    </>
  );
}

export default VirtualCard;
