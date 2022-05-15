import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Item from "../Item/Item";
import ItemList from "../Item/ItemList";
import { CContainer, CRow, CFooter, CSpinner } from "@coreui/react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { changeCountry, changeCurrency } from "../../redux/actions";
import { useItems } from "../../queries/items";

const Homepage = () => {
  const [items, setItems] = useState([]);
  const logged = useSelector((state) => state.LOGGED);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const reduxCurrency = useSelector((state) => state.CURRENCY);
  const reduxCountry = useSelector((state) => state.COUNTRY);

  //const userShop = sessionStorage.getItem("shop");

  const [currency, setCurrency] = useState(localStorage.getItem("currency"));
  const [country, setCountry] = useState(localStorage.getItem("country"));

  useEffect(() => {
    if (logged == false) {
      navigate("/login");
    }
  }, [setItems]);

  function GetAllItems() {
    const { error, data, loading } = useItems();

    console.log(data);

    if (loading)
      return (
        <div>
          <CSpinner />
          <br />
          <br />
        </div>
      );

    return (
      <div>
        <CContainer>
          <CRow xs={{ cols: 5 }}>
            <ItemList items={data.getAllItems} />
          </CRow>
        </CContainer>
      </div>
    );
  }

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
    dispatch(changeCurrency(e.target.value));
    localStorage.setItem("currency", e.target.value);
  };

  const handleCountryChange = (e) => {
    dispatch(changeCountry(e.target.value));
    localStorage.setItem("country", e.target.value);
  };

  console.log("\n Inside Home Page");

  return (
    <div className="App">
      <br />
      <br />
      <h1>Welcome to Etsy</h1>

      <br />
      <br />
      <br />
      {GetAllItems()}

      <CFooter>
        <div>
          Etsy Clone
          <span> 2022 ParmeetSingh</span>
        </div>
        <div>
          Select Country:
          <select value={reduxCountry} onChange={handleCountryChange}>
            <option value="japan">Japan</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="United Kingdom">Europe</option>
            <option value="United States">United States</option>
            <option value="India">India</option>
          </select>
        </div>

        <div>
          <span>Select Currency</span>
          <select value={reduxCurrency} onChange={handleCurrencyChange}>
            <option value="₹">Rupee (₹)</option>
            <option value="£">Pound (£)</option>
            <option value="¥">Euro (€)</option>
            <option value="$">U.S. Dollar ($)</option>
            <option value="¥">Yen (¥)</option>
          </select>
        </div>
      </CFooter>
    </div>
  );
};

export default Homepage;
