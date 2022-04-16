import React , {useEffect, useState} from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router';
import { useParams } from 'react-router';
import { CContainer, CRow, CCol, CButton } from '@coreui/react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../redux/actions';

const ItemPage = (props) => {

    const[item, setItem]= useState({});
    const[fav,setFav] = useState(false);
    const[shopName, setShopName] = useState("");
    const[sales, setSales]= useState(0);
    const location = useLocation();
    //const {id} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let[counter, setCounter] = useState(1);
    const currency = useSelector(state=> state.CURRENCY);

    useEffect(() => {

        async function getItem(){
 
            console.log(location.state.item_ID);
            let response = axios.get("http://localhost:3001/api/v1/items/"+ location.state.item_ID);
            response = await response;

            setItem(response.data);
            console.log(response.data)

            // let res2 = axios.get("http://localhost:3001/api/v1/shops/"+ item.shop);
            // res2 = await res2;

            // setShopName(res2.data.shopname);
            // setSales(res2.data.total_sales)
        }

        getItem();

    },[setItem]);


    useEffect(()=> {

        axios.get("http://localhost:3001/api/v1/shops/"+ item.shop)
            .then(response => {
                setShopName(response.data.name);
                setSales(response.data.total_sales)
            });

        if(item.fav === "1"){
            setFav(true);
        }
        else{
            setFav(false);
        }

    })


    const handleFavorite = () => {

        const data = {
            fav:"1"
        }
        ;
        axios.put("http://localhost:3001/api/v1/items/fav/"+ item.item_ID, data)
        .then(response => {
            setFav(true);
        })
        console.log("Item Favorited")
        window.location.reload(false);
    }

    const handleUnFav = () => {

        const data = {
            fav:"0"
        }

        axios.put("http://localhost:3001/api/v1/items/fav/"+ item.item_ID, data)
        .then(response => {
            setFav(false);
        })
        console.log("Item UnFavorited")
        window.location.reload(false);
    }

    const onNavigateShopPage = () => {
        navigate("/shop/" + item.shop , {state:{shop_ID:item.shop}});
    }

    const handlePlus = () => {
        if(counter <= item.quantity)
        setCounter(counter++)
    }

    const handleMinus = () => {
        if(counter > 0)
        setCounter(counter--)
    }

    const handleAddToCart = (e) => {


        const cartData = {
            item_ID:item.item_ID,
            image:item.image,
            name:item.name,
            shop:shopName,
            quantity:counter,
            stock:item.quantity,
            price:item.price,
            totalPrice:item.price*counter
        }

        dispatch(addToCart(cartData));

        // axios.post("http://localhost:3001/api/v1/cart/" , cartData)
        // .then(response => {
        //     console.log(response);
        //     console.log("Item Added to cart");
        //     console.log(cartData);
        // })


        // handleQuantityChange()
        navigate("/cart/");

    }

    const handleQuantityChange = () => {

        // const data = {
        //     quantity:item.quantity - counter
        // }

        // axios.put("http://localhost:3001/api/v1/items/stock/"+item.item_ID , data)
        // .then(response => {
        //     console.log(response);
        // })
    }

    return(
        <><div>
            {/* {seen ? <ShopPopup name="TESTING" toggle={handlePopup} /> : null} */}
            <br /><br /><br /><br /><br />
            <CContainer>

            <CRow className="justify-content-between">
                <CCol ><img src={item.image} width={600}/></CCol>

                <CCol xs={2}>


                    { fav ?  
                    
                    <CButton color='link' onClick={handleUnFav} ><img src='/faved.png' width={50}/></CButton> 
                
                    :   
                    
                    <CButton color='link' onClick={handleFavorite} ><img src='/unfaved.png'width={50}/></CButton>
                
                    }

                </CCol>

                <CCol>
                    
                    <h1><b>{item.name}</b></h1>

                    <br />
                    By:<CButton color='link' onClick={onNavigateShopPage}>{shopName}</CButton> Sales: {sales}
                   
                    
                    <br /><br />
                    Description: <b>{item.description}</b>

                    <br /><br />
                    Price <b>{currency + item.price}</b>

                    <br /><br />
                    Stock: <b>{item.quantity > 0 ? item.quantity : "Out of Stock"}</b>

                    <br /><br />
                    {item.quantity > 0      ?

                        <><CButton variant='outline' onClick={handleMinus}>-</CButton><b>   {counter}   </b><CButton variant='outline' onClick={handlePlus}>+</CButton></>

                    : ""}

                    <br/>
                    <br/>
                    <br/>

                    {item.quantity > 0      ?
                    
                        <CButton onClick={handleAddToCart} color='success' variant='outline' >Add to Cart: {currency}{item.price*counter}</CButton>

                    :
                    
                    "Please wait till more stock is added"}
                    
                </CCol>
            </CRow>
            </CContainer>

        </div>
       </>
    )
}

export default ItemPage;
