import React , {useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import ItemList from '../Item/ItemList';
import { useParams } from 'react-router';
import ItemPopup from './ItemPopup';
import { CContainer,CCol,CRow, CButton } from '@coreui/react';
import { useLocation } from 'react-router';

const ShopPage = (props) => {
    const[name, setName] = useState("");
    const[image, setImage]= useState("");
    const[total_sales, setTotalSales] = useState("");
    const[shop_ID, setShopID]= useState("");
    const[items, setItems] = useState([]);
    const[username, setUsername] = useState("");
    const[valid, setValid] = useState(false);
    const[seen, setSeen] = useState(false);
    const[userShop,setUserShop] = useState(false);
    const [shop,setShop] = useState("");
    //const {id} = useParams();
    const location = useLocation();

    // To handle the image input
    const hiddenFileInput = React.useRef(null);

    useEffect(() => {

        async function getResponse(){
            let response = ""
            //let response = axios.get("http://localhost:3001/api/v1/shops/usershop/" + sessionStorage.getItem("token"));
            if(location.state == null){
                response = axios.get("http://localhost:3001/api/v1/shops/" + sessionStorage.getItem("shop"))
                setUserShop(true);
                setShop(sessionStorage.getItem("shop"));
            }
            else{
                response = axios.get("http://localhost:3001/api/v1/shops/" + location.state.shop_ID)
                setShop(location.state.shop_ID);
                //setUserShop(true);
            }
            response = await response;
            setShopID(response.data.shop_ID);
            setImage(response.data.image);
            setName(response.data.name);
            setUsername(response.data.username);
            setTotalSales(response.data.total_sales);

            // if(response.data.username === sessionStorage.getItem("token")){
            //     setUserShop(true);
            // }

            console.log("Shop ID: " + location.state.shop_ID)
        }

        getResponse();

    },[]);

    useEffect(() => {
        async function getItems() {

            let response = "";
            if(location.state == null){
                response = axios.get("http://localhost:3001/api/v1/items/byshop/" + sessionStorage.getItem("shop"))
            }
            else{
                response = axios.get("http://localhost:3001/api/v1/items/byshop/" + location.state.shop_ID)
            }

            //let response = axios.get("http://localhost:3001/api/v1/items/byshop/" + location.state.shop_ID)
            response = await response;
            setItems(response.data);
            // if(items.length > 0){
            //     setValid(true);
            // }

            console.log("Items for Store " + location.state.shop_ID + " fetched");
            console.log(response);
        }
        getItems();
    },[setItems]);


    // Opens file input upon button press
    const handleClick = event => {
        hiddenFileInput.current.click();
    };

    const handleItemPopup = () => {
        setSeen(!seen);
        console.log("Pressed:" , seen);
    }

    const uploadImage = async e=> {
        const files = e.target.files
        const data = new FormData
        data.append('file', files[0])
        data.append('upload_preset', '273-images')

        const res = await fetch(
            'http://api.cloudinary.com/v1_1/ddpcbqqmh/image/upload', 
            {
                method: 'POST',
                body: data
            }
        )

        const file = await res.json()
        setImage(file.secure_url)

        console.log(file.secure_url)

    }

    const updateImage = async e => {

        const newData = {
            name:name,
            total_sales:total_sales,
            image:image
        }

        let response = await axios.put("http://localhost:3001/api/v1/shops/" + location.state.shop_ID , newData);

        console.log(response)

    }

    return(

        <div>
            <div className='App'>
                {seen ? <ItemPopup shop={shop_ID} name={name} toggle={handleItemPopup} /> : null}
            </div>
        

        <br/><br/>

        <CContainer>
            <CRow>
            <CCol > 
                <img src={image} width={300}/>
                <br/>
                <p>   </p>
                <CButton color='dark' style={{marginRight:10 , marginLeft:50}} onClick={handleClick}>Edit Image</CButton>
                <CButton color='dark' onClick={updateImage}>Update</CButton>
                
                <input type="file" ref={hiddenFileInput} onChange={uploadImage} style={{display:'none'}} />
            
            </CCol>
        
            <CCol>

                <br/>
                <br /><h1><b>{name}</b></h1>
                by: <b>{username}</b>
                <br />
                <br/>{userShop ? <h3> Total Sales: {total_sales} </h3> : "" }


            </CCol>
            <CCol>

                <br/>
                <br/>
                <br/>
                <br/>
                
            </CCol>


            </CRow>
            </CContainer>


            {/* {items.length> 0 ? setValid(true): setValid(false)} */}
            <div className='App'>
                <h2>Shop Items:</h2>
                <br />
                {userShop ? <CButton color='success' variant='outline' onClick={handleItemPopup}> <b>+</b> Add Item</CButton> : ""}

                <br/>
                <br/>
                {items.length > 0 ? 

                    <CContainer>
                    <CRow xs={{ cols: 4 }}>
                        {userShop ?     
                            <ItemList type={"shop"} items={items}/>
                            :
                            <ItemList items={items}/>
                        }
                        {/* <ItemList type={"shop"} items={items}/> */}
                    </CRow>
                    </CContainer>

                : 
                        <><br /><br /><br /><br /><p>No Items in this shop yet. Add new items</p></>}
                        {/* {{valid ? items.map(({ item_ID, name, description, quantity }) => (
                            <p key={item_ID}>Item name: {name},Description {description}, Quantity: {quantity}.</p>
                        )) : <p>NO ITEMS in this Shop</p>}} */} 

            </div>

                       

        </div>
    )
}

export default ShopPage;
