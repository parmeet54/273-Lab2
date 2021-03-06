import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CFormCheck,
  CDropdown,
  CDropdownToggle,
  CDropdownItem,
  CDropdownMenu,
  CFormSelect,
  CContainer,
  CRow,
  CCol,
} from "@coreui/react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  modifyQuantity,
  emptyCart,
  addGift,
} from "../../redux/actions";
import CartList from "./CartList";
import { CreateOrder } from "../../mutations/orders";

const Cart = () => {
  //const[cartItems,setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const [hasItems, setHasItems] = useState(false);
  const logged = useSelector((state) => state.LOGGED);
  const currency = useSelector((state) => state.CURRENCY);
  const cartItems = useSelector((state) => state.CART.items);
  const dispatch = useDispatch();

  useEffect(() => {
    if (logged == false) {
      navigate("/login");
    }

    if (cartItems) {
      if (cartItems.length > 0) {
        setHasItems(true);
        setTotal(cartItems.reduce((a, v) => a + v.totalPrice, 0).toFixed(2));
      } else {
        setHasItems(false);
        setTotal(0.0);
      }
    }
  }, [cartItems]);

  function HandleCheckout() {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();

    today = mm + "/" + dd + "/" + yyyy;

    let randomID = Math.floor(Math.random() * 99999) + 1;

    cartItems.map((item) => {
      // Fix Item Stocks
      let quantity = {
        quantity: item.stock - item.quantity,
      };

      axios
        .put(
          "http://localhost:3001/api/v1/items/stock/" + item.item_ID,
          quantity
        )
        .then((response) => {
          console.log("Stock Fixed");
          console.log(response);
        });
    });

    // New ORDER
    const orderData = {
      order_ID: randomID,
      username: sessionStorage.getItem("token"),
      items: cartItems,
      date_purc: today,
      total: total,
    };

    // const { error, laoding, data } = CreateOrder(
    //   orderData.order_ID,
    //   orderData.username,
    //   orderData.items,
    //   orderData.total,
    //   orderData.date_purc
    // );
    // console.log({ error, laoding, data });

    // Make Axios POST call

    axios
      .post("http://localhost:3001/api/v1/orders/", orderData)
      .then((response) => {
        console.log("Order Created");
        console.log(response);
        dispatch(emptyCart());
      });

    dispatch(emptyCart());
    navigate("/orders");
  }

  const handleDeleteCart = () => {
    setHasItems(false);
    navigate("/");
    dispatch(emptyCart());
  };

  return (
    <div className="App">
      {console.log(cartItems)}
      <br />
      <br />
      <h1>Your Cart</h1>
      <br />
      <br />
      <br />

      {hasItems ? (
        <CContainer>
          <CRow>
            <CCol>
              <h3>Remove Item</h3>
            </CCol>
            <CCol>
              <h3>Image</h3>
            </CCol>
            <CCol>
              <h3>Name</h3>
            </CCol>
            <CCol>
              <h3>Quantity</h3>
            </CCol>
            <CCol>
              <h3>Add Gift</h3>
            </CCol>
            <CCol>
              <h3>Price</h3>
            </CCol>
          </CRow>
        </CContainer>
      ) : (
        ""
      )}

      <CContainer>
        <br />
        <CartList items={cartItems} />
        <br />
      </CContainer>

      <br />
      <br />
      <br />
      <br />
      <br />

      {hasItems ? (
        <>
          <>
            <CContainer>
              <CRow>
                <CCol>
                  <h3>
                    Total:{currency}
                    {total}
                  </h3>
                </CCol>
              </CRow>
            </CContainer>

            <CButton
              size="lg"
              variant="outline"
              color="success"
              onClick={() => HandleCheckout()}
            >
              Checkout
            </CButton>
            <br />
            <br />
            <br />
            <CButton
              size="lg"
              variant="outline"
              color="danger"
              onClick={() => handleDeleteCart()}
            >
              Empty Cart
            </CButton>
          </>
        </>
      ) : (
        <>
          <br />
          <br />
          <br />
          <br />
          <h2>No Items in your cart</h2>
        </>
      )}
    </div>
  );
};

export default Cart;
