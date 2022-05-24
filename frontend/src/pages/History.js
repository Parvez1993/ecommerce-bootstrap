import axios from "axios";
import React, { useEffect, useReducer } from "react";
import { Container, Table } from "react-bootstrap";
import { useStore } from "../Store";

function History() {
  const { state3 } = useStore();

  console.log(state3);
  const reducer7 = (state, action) => {
    switch (action.type) {
      case "FETCH_REQUEST":
        return { ...state, loading: true, error: "" };
      case "FETCH_SUCCESS":
        return { ...state, loading: false, order: action.payload, error: "" };
      case "FETCH_FAIL":
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  const [{ loading, order, error }, dispatch] = useReducer(reducer7, {
    loading: true,
    order: [],
    error: "",
  });

  const { order: orderItems } = order;

  console.log(orderItems);

  useEffect(() => {
    const getProducts = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const tempProducts = await axios.get("/orders/get", {
          headers: {
            authorization: `Bearer ${state3.userInfo.token}`,
          },
        });
        dispatch({
          type: "FETCH_SUCCESS",
          payload: tempProducts.data,
          loading: false,
        });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL" });
      }
    };

    getProducts();
  }, []);

  console.log(order);

  return (
    <Container>
      {loading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>OrderItems</th>
              <th>Payment Method</th>
              <th>Item Price</th>
              <th>Total Price</th>

              <th>Tax Fee</th>
              <th>shipping Fee</th>
              <th>Paid</th>
              <th>Delivered</th>
            </tr>
          </thead>

          {orderItems.length > 1
            ? orderItems.map((i, k) => {
                return (
                  <>
                    <tbody>
                      <tr>
                        <td>{k + 1}</td>
                        <td>
                          {i.orderItems.map((item, k) => {
                            return (
                              <>
                                <p>
                                  {item.name} {item.quantity} {item.price}
                                </p>
                              </>
                            );
                          })}
                        </td>
                        <td>{i.paymentMethod}</td>
                        <td>{i.itemsPrice}</td>
                        <td>{i.totalPrice}</td>

                        <td>{i.taxPrice}</td>
                        <td>{i.shippingPrice}</td>
                        <td>{i.isPaid ? "Paid" : "Not Paid"}</td>
                        <td>{i.isDelivered ? "No" : "Yes"}</td>
                      </tr>
                    </tbody>
                  </>
                );
              })
            : ""}

          {/* {order.map((i, k) => {
            return;
          })} */}
        </Table>
      )}
    </Container>
  );
}

export default History;
