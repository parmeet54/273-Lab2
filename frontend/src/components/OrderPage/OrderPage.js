import React, { useState } from "react";
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CSpinner,
} from "@coreui/react";
import { useDispatch, useSelector } from "react-redux";
import { useOrders } from "../../queries/orders";

const OrderPage = () => {
  const dispatch = useDispatch();
  const currency = useSelector((state) => state.CURRENCY);

  function GetOrders() {
    const user = sessionStorage.getItem("token");

    const { error, loading, data } = useOrders(user);
    console.log(data);

    if (loading)
      return (
        <div>
          <CSpinner />
          <br />
          <br />
        </div>
      );

    return <div>{displayOrders(data.getOrdersByUser)}</div>;
  }
  const displayOrders = (userOrders) =>
    userOrders.map(({ order_ID, date_purc, total, items }) => {
      return (
        <>
          <CTable>
            <CTableHead color="light">
              <CTableRow>
                <CTableHeaderCell> </CTableHeaderCell>
                <CTableHeaderCell> </CTableHeaderCell>
                <CTableHeaderCell scope="col">
                  <h3>Order # {order_ID}</h3>
                </CTableHeaderCell>
                <CTableHeaderCell> </CTableHeaderCell>
                <CTableHeaderCell scope="col">
                  <h3>Date : {date_purc}</h3>
                </CTableHeaderCell>
                <CTableHeaderCell> </CTableHeaderCell>
              </CTableRow>
              <CTableRow />
            </CTableHead>
            {items.map(({ image, name, shop, quantity, price }) => (
              <CTableBody>
                <CTableRow>
                  <CTableHeaderCell align={"middle"} scope="row">
                    <img src={image} width={120} height={100} />
                  </CTableHeaderCell>
                  <CTableDataCell align={"middle"}>{name}</CTableDataCell>
                  {/* <CTableDataCell align={"middle"}>
                  <b>{gift_desc}</b>
                </CTableDataCell> */}
                  <CTableDataCell align={"middle"}>Shop: {shop}</CTableDataCell>
                  <CTableDataCell align={"middle"}>
                    Quantity:{quantity}
                  </CTableDataCell>
                  <CTableDataCell align={"middle"}>
                    Price:{currency}
                    {price}
                  </CTableDataCell>
                </CTableRow>
              </CTableBody>
            ))}
            <CTableRow></CTableRow>
            <CTableHeaderCell></CTableHeaderCell>
            <CTableHeaderCell></CTableHeaderCell>
            <CTableHeaderCell></CTableHeaderCell>
            <CTableHeaderCell></CTableHeaderCell>
            <CTableHeaderCell color="light">
              {" "}
              <h3>
                Total: {currency}
                {total}
              </h3>
            </CTableHeaderCell>
          </CTable>
          <br />
          <br />
        </>
      );
    });

  return (
    <div className="App">
      <br />
      <br />

      <h1>My Purchases</h1>
      <br />
      {GetOrders()}
    </div>
  );
};

export default OrderPage;
