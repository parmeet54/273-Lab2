import React , {useEffect, useState} from 'react';
import axios from 'axios';
import { CTable, CTableHead, CTableRow,CTableHeaderCell, CTableBody, 
    CTableDataCell, CButton, CFormCheck, CDropdown, CDropdownToggle, 
    CDropdownItem, CDropdownMenu, CFormSelect, CContainer, CRow, CCol } from '@coreui/react';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart , modifyQuantity, emptyCart, addGift } from '../../redux/actions';
import CartList from './CartList';

const Cart = () => {
    //const[cartItems,setCartItems] = useState([]);
    const[total, setTotal] = useState(0);
    const navigate = useNavigate();
    const[hasItems, setHasItems] = useState(false);
    const logged = useSelector(state=> state.LOGGED);
    const currency = useSelector(state=> state.CURRENCY);
    const cartItems = useSelector(state => state.CART.items)
    const dispatch = useDispatch();

    useEffect(() => {

        if(logged == false){
            navigate('/login')
        }

        if(cartItems){
            if(cartItems.length > 0){
                setHasItems(true)
                setTotal(cartItems.reduce((a, v) => a + v.totalPrice, 0).toFixed(2));
            }
            else{
                setHasItems(false)
                setTotal(0.00);
            }
        }

    },[cartItems]);


    const handleCheckout = () => {
        
        const theRandomNumber = Math.floor(Math.random() * 99999999) + 1;
        const today = new Date().toString();

        cartItems.map(item => {

            

            let randomID = Math.floor(Math.random() * 99999) + 1;

            const data = {
                order_item_ID:randomID,
                order_ID:theRandomNumber,
                image:item.image,
                name:item.name,
                shop:item.shop,
                quantity:item.quantity,
                price:item.price,
                date_purc:today,
                total:total,
                username:sessionStorage.getItem("token")
            }

            axios.post("http://localhost:3001/api/v1/orders/" , data)
            .then(response => {
                console.log(response);
            })


            let quantity = {
                quantity:item.stock - data.quantity
            }

            axios.put("http://localhost:3001/api/v1/items/stock/"+item.cart_item_ID , quantity)
            .then(response => {
                console.log("Stock Fixed")
                console.log(response);
            })

            // CREATE Total Order
        })

        //axios.delete("http://localhost:3001/api/v1/cart/" + sessionStorage.getItem("token"))

        navigate("/orders");
    }

    const handleDeleteCart = () => {
        setHasItems(false);
        dispatch(emptyCart());
        navigate("/")
    }
    
    return(
        <div className='App'>

            {console.log(cartItems)}
            <br/>
            <br/>               
            <h1>Your Cart</h1>
            <br/>               
            <br/>               
            <br/> 

            {hasItems ? 
                <CContainer>
                <CRow >
                    <CCol><h3>Remove Item</h3></CCol>
                    <CCol><h3>Image</h3></CCol>
                    <CCol><h3>Name</h3></CCol>
                    <CCol><h3>Quantity</h3></CCol>
                    <CCol><h3>Add Gift</h3></CCol>
                    <CCol><h3>Price</h3></CCol>
                </CRow>
                </CContainer>

            :

                ""
            }
            
            {/* <CTable>
            <CTableHead color="light">
                <CTableRow>
                <CTableHeaderCell scope="col">Remove Item</CTableHeaderCell>
                <CTableHeaderCell scope="col">Image</CTableHeaderCell>
                <CTableHeaderCell scope="col">Item Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Quantity</CTableHeaderCell>
                <CTableHeaderCell scope="col">Add Gift</CTableHeaderCell>
                <CTableHeaderCell scope="col">Price</CTableHeaderCell>
                </CTableRow>
            </CTableHead>
            </CTable> */}

            <CContainer>
                <br/>
                <CartList items={cartItems}/>
                <br/>
            </CContainer>

            <br/>
            <br/>
            <br/>
            <br/>
            <br/>

                        
            {hasItems ?
                <><>
                    <CContainer>
                        <CRow>
                            <CCol><h3>Total:{currency}{total}</h3></CCol>
                        </CRow>
                    </CContainer>

                    <CButton size="lg" variant="outline" color='success' onClick={() => handleCheckout()}>Checkout</CButton>
                    <br /><br /><br />
                    <CButton size="lg" variant="outline" color='danger' onClick={() => handleDeleteCart()}>Empty Cart</CButton></></>

            :
                <><br /><br /><br /><br /><h2>No Items in your cart</h2></>

            }
           
        </div>
    )
}

export default Cart;

