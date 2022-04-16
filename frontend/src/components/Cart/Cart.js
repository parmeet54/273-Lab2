import React , {useEffect, useState} from 'react';
import axios from 'axios';
import { CTable, CTableHead, CTableRow,CTableHeaderCell, CTableBody, 
    CTableDataCell, CButton, CFormCheck, CDropdown, CDropdownToggle, 
    CDropdownItem, CDropdownMenu, CFormSelect } from '@coreui/react';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart , modifyQuantity, emptyCart, addGift } from '../../redux/actions';


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
            setHasItems(true)
            setTotal(cartItems.reduce((a, v) => a + v.totalPrice, 0).toFixed(2));
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
    }

    const createSelectItems= (stock) => {
        let items = [];         
        for (let i = 0; i <= stock; i++) {             
             items.push(<option key={i} value={i}>{i}</option>);   
             //here I will be creating my options dynamically based on
             //what props are currently passed to the parent component
        }
        return items;
    }

    const handleQuantityAdjust = (item_ID, quantity) => {

        if(quantity == 0){
            console.log("Removing Item")
            dispatch(removeFromCart(item_ID))
        }
        else{
            console.log("Changing Quantity for",item_ID)
            const data = {
                id: item_ID,
                quantity:quantity
            }
            dispatch(modifyQuantity(data));    
            console.log("HERE") 
        }
           
    }


    const handleRemoveItem = (item_ID) => {
        dispatch(removeFromCart(item_ID))
    }
    
    console.log("\n Inside Cart Page")

    return(
        <div className='App'>

            {console.log(cartItems)}
            <br/>
            <br/>               
            
            <h1>Your Cart</h1>
            <br/>  
            {/* <CTable>
            <CTableHead color="light">
                <CTableRow>
                <CTableHeaderCell scope="col">Image</CTableHeaderCell>
                <CTableHeaderCell scope="col">Item Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Quantity</CTableHeaderCell>
                <CTableHeaderCell scope="col">Price</CTableHeaderCell>
                </CTableRow>
            </CTableHead>
            <CTableBody>
                {cartItems.length > 0 ? 

                    cartItems.map(({ image, name, quantity, price }) => (
                    
                    <CTableRow>
                        <CTableHeaderCell align={'middle'} scope="row"><img src={image} width={100}/></CTableHeaderCell>
                        <CTableDataCell align={'middle'}>{name}</CTableDataCell>
                        <CTableDataCell align={'middle'}>{quantity}</CTableDataCell>
                        <CTableDataCell align={'middle'}>{localStorage.getItem("currency")}{price}</CTableDataCell>
                    </CTableRow>
                    ))  
                    : 
                    <h2>No Items in your cart</h2>
                }
                {cartItems.length > 0 ? 

                    <CTableRow>
                    <CTableDataCell></CTableDataCell>
                    <CTableDataCell></CTableDataCell>
                    <CTableDataCell></CTableDataCell>
                    <CTableDataCell><h2>Total: {localStorage.getItem("currency")}{total}</h2></CTableDataCell>
                    </CTableRow>

                    : ""}

            </CTableBody>

            </CTable> */}
             {hasItems?  
            
                <><CTable>
                    <CTableHead color="dark">
                        <CTableRow>
                            <CTableHeaderCell scope="col">Image</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Item Name</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Quantity</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Add Gift</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Price</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>

                    <CTableBody>

                        {cartItems.map(({ item_ID, image, name, quantity, totalPrice, stock }) => (

                            <CTableRow>     
                                <CTableHeaderCell align={'middle'} scope="row"><img src={image} width={100} /></CTableHeaderCell>
                                <CTableDataCell align={'middle'}><b>{name}</b></CTableDataCell>
                                <CTableDataCell style={{width:80}}  align={'middle'}>

                                    <CFormSelect value={quantity} onChange={(e) => handleQuantityAdjust(item_ID, e.target.value)}>
                                        {createSelectItems(stock)}
                                    </CFormSelect>

                                </CTableDataCell>

                                <CTableDataCell style={{width:300}}  align={'middle'}>
                                    <CFormCheck id="flexCheckDefault"/>
                                </CTableDataCell>
                                <CTableDataCell align={'middle'}>{currency}{totalPrice}</CTableDataCell>
                            </CTableRow>
                        ))}

                        <CTableRow color="dark">
                            <CTableDataCell></CTableDataCell>
                            <CTableDataCell></CTableDataCell>
                            <CTableDataCell></CTableDataCell>
                            <CTableDataCell></CTableDataCell>
                            <CTableDataCell><h2>Total: {currency}{total}</h2></CTableDataCell>
                        </CTableRow>



                    </CTableBody>

                </CTable><br /><br /><br /><br />
                
                <CButton size="lg" variant="outline" color='success' onClick={handleCheckout}>Checkout</CButton></>
            
                 :

                    <><br /><br /><br /><br /><h2>No Items in your cart</h2></>
            } 

            

           
        </div>
    )
}

export default Cart;

