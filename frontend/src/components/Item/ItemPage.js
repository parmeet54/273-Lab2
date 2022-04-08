import React , {useEffect, useState} from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router';
import { CContainer, CRow, CCol, CButton } from '@coreui/react';

const ItemPage = (props) => {

    const[item, setItem]= useState({});
    const[fav,setFav] = useState(false);
    const[shopName, setShopName] = useState("");
    const[sales, setSales]= useState(0);
    const {id} = useParams();
    const navigate = useNavigate();
    let[counter, setCounter] = useState(1);


    useEffect(() => {

        async function getItem(){
 
            let response = axios.get("http://localhost:3001/api/v1/items/"+ id);
            response = await response;

            setItem(response.data[0]);
            console.log(response.data[0])
        }

        getItem();

    },[setItem]);


    useEffect(()=> {

        axios.get("http://localhost:3001/api/v1/shops/"+ item.shop)
            .then(response => {
                setShopName(response.data[0].name);
                setSales(response.data[0].total_sales)
                console.log(response.data[0].name)
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
        navigate("/shop/" + item.shop);
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
            cart_item_ID:id,
            image:item.image,
            name:item.name,
            shop:item.shopname,
            quantity:counter,
            stock:item.quantity,
            price:item.price*counter,
            username:sessionStorage.getItem("token")
        }

        axios.post("http://localhost:3001/api/v1/cart/" , cartData)
        .then(response => {
            console.log(response);
            console.log("Item Added to cart");
            console.log(cartData);
        })


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
                    Price <b>{localStorage.getItem("currency") + item.price}</b>

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
                    
                        <CButton onClick={handleAddToCart} color='success' variant='outline' >Add to Cart: {localStorage.getItem("currency")}{item.price*counter}</CButton>

                    :
                    
                    ""}
                    
                </CCol>
            </CRow>
            </CContainer>

        </div>
       </>
    )
}

export default ItemPage;
