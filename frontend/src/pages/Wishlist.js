import React from "react";
import { useContext } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { useStore } from "../Store";

function Wishlist() {
  const { state, dispatch: ctxDispatch, state2, dispatch2 } = useStore();

  const deleteItem = (id) => {
    dispatch2({
      type: "WISHLIST_REMOVE_ITEM",
      payload: id,
    });
  };

  //add to cart
  const addtoCart = async (product) => {
    const existingItem = state.cart.cartItems.find(
      (item) => item._id === product._id
    );
    let quantity = existingItem ? existingItem.quantity + 1 : 1;

    if (product.stock < quantity) {
      quantity = product.stock;
      return window.alert("No Stock left");
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...product, quantity },
    });

    dispatch2({
      type: "WISHLIST_REMOVE_ITEM",
      payload: product._id,
    });
  };
  return (
    <>
      <Container>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Price</th>
              <th>Add to Cart</th>
              <th>Remove</th>
            </tr>
          </thead>
          {state2.wishlist.wishlistItems.map((item) => {
            return (
              <>
                <tr>
                  <td>{item.name}</td>
                  <td>
                    <img
                      src={item.img}
                      alt={item.name}
                      style={{ width: "100px" }}
                    />
                  </td>
                  <td>{item.price}</td>
                  <td>
                    <div>
                      {item.stock === 0 ? (
                        <Button className="bg-dark w-50" disabled>
                          Out of stock
                        </Button>
                      ) : (
                        <Button
                          className="bg-dark w-50"
                          onClick={() => addtoCart(item)}
                        >
                          Add to Cart{" "}
                        </Button>
                      )}
                    </div>
                  </td>
                  <td>
                    <div>
                      <Button
                        variant="danger"
                        onClick={() => {
                          deleteItem(item._id);
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              </>
            );
          })}
        </Table>
      </Container>
    </>
  );
}

export default Wishlist;
