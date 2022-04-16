import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "../Store";
import axios from "axios";
function Order() {
  const { id } = useParams();

  const { state7, dispatch7, state3 } = useStore();

  // console.log(state3.userInfo.data.user._id);

  const { order } = state7;

  useEffect(() => {
    if (!order._id || (order._id && order._id !== id)) {
      console.log("hello is it me you are looking for");
      const getOrder = async () => {
        try {
          dispatch7({ type: "FETCH_REQUEST" });
          const { data } = await axios.get(`/orders/${id}`, {
            headers: { Authorization: "Bearer " + state3.userInfo.token },
          });

          console.log(data);
          dispatch7({ type: "FETCH_SUCCESS", payload: data });
        } catch (error) {
          dispatch7({ type: "FETCH_SUCCESS", payload: error });
        }
      };
      getOrder();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div>
      <h1>Message kharap</h1>
    </div>
  );
}

export default Order;
