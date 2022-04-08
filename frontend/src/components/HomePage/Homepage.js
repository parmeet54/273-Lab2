import React , {useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Item from '../Item/Item';
import ItemList from '../Item/ItemList';
import { CContainer, CRow, CFooter } from '@coreui/react';

const Homepage = () => {

    const[items, setItems] = useState([])

    //const userShop = sessionStorage.getItem("shop");

    const[currency,setCurrency] = useState(localStorage.getItem("currency"));
    const[country,setCountry] = useState(localStorage.getItem("country"));
  
    useEffect(() => {
        async function getItems() {

            let shop = axios.get("http://localhost:3001/api/v1/shops/usershop/"+sessionStorage.getItem("token"));
            shop = await shop;

            let response = axios.get("http://localhost:3001/api/v1/items/")
            response = await response;

            setItems(response.data.filter(item =>item.shop != shop.data[0].shop_ID))
        }
        getItems();
    },[setItems]);

    const handleCurrencyChange = (e) => {
        setCurrency(e.target.value);
        localStorage.setItem("currency" , e.target.value);
    }

    const handleCountryChange = (e) => {
        localStorage.setItem("country" , e.target.value);
    }

    console.log("\n Inside Home Page")

    return(
        <div className='App'>
            <br/>
            <br/>             
            <h1>Welcome to Etsy</h1>

            <br/>  
            <br/>
            <br/>

            <CContainer>
                <CRow xs={{ cols: 5 }}>
                    <ItemList items={items}/>
                </CRow>
            </CContainer>

            <CFooter>
            <div>
                Etsy Clone
                <span> 2022 ParmeetSingh</span>
            </div>
            <div>
                Select Country: 
                <select value={country} onChange={handleCountryChange}>
                    <option value="japan">Japan</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United Kingdom">Europe</option>
                    <option value="United States">United States</option>
                    <option value="India">India</option>
                </select>
            </div>
            
            <div>
                <span>Select Currency</span>
                <select value={currency} onChange={handleCurrencyChange}>
                    <option value="₹">Rupee (₹)</option>
                    <option value="£">Pound (£)</option>
                    <option value="¥">Euro (€)</option>
                    <option value="$">U.S. Dollar ($)</option>
                    <option value="¥">Yen (¥)</option>
                </select>
            </div>
            </CFooter>

        </div>
    )
}

export default Homepage;

