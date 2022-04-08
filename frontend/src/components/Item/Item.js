import React from 'react';
import {useEffect, useState} from 'react';
import { CCard, CCardImage, CCardBody, CCardTitle, CCardText, CButton } from '@coreui/react'
import ItemEditPopup from './ItemEditPopup';
import axios from 'axios';
import { useNavigate } from 'react-router';


function Item(props) {

    const[seen, setSeen] = useState(false);
    const[fav,setFav]= useState(false);
    const navigate = useNavigate();
    const[unFav, setUnfav] = useState("");
 
    useEffect( () => {
        //props.item.fav = props.item.fav;

        if(props.item.fav === "1"){
            setFav(true);
            //setUnfav(false);
        }
        else{
            setFav(false);
            //setFav(false);
        }
    })

    const handleFavorite = () => {

        const data = {
            fav:"1"
        }
        ;
        axios.put("http://localhost:3001/api/v1/items/fav/"+ props.item.item_ID, data)
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

        axios.put("http://localhost:3001/api/v1/items/fav/"+ props.item.item_ID, data)
        .then(response => {
            setFav(false);
        })
        console.log("Item UnFavorited")
        window.location.reload(false);
    }

    const onNavigateItemPage = () => {
        navigate("/item/" + props.item.item_ID);
    }

    const handleItemPopup = () => {
        setSeen(!seen);
        //console.log("Pressed:" , seen);
    }

    const handleDeleteItem = () => {
        axios.delete("http://localhost:3001/api/v1/items/"+ props.item.item_ID);
        window.location.reload(false);

    }

    return (
        
        <div className='hover' >
            {seen ? <ItemEditPopup item={props.item} toggle={handleItemPopup} /> : null}
            {/* <button onClick={onNavigateItemPage}> */}
            
            <CCard  className={`mb-3 border-light border-top-3 border-top-light`} >
            <CCardImage onClick={onNavigateItemPage} orientation="top" src={props.item.image} width={150} height={200}/>
                <CCardBody>
                <CCardTitle>{props.item.name}</CCardTitle>

                <br/>
                <CCardText>Stock:{props.item.quantity > 0 ? props.item.quantity : "Out of Stock"}</CCardText>          
                <CCardText>{localStorage.getItem("currency")}{props.item.price}</CCardText>
                
                {/* <CButton color='light' onClick={onNavigateItemPage} href="/item">Item Page</CButton> */}
                <br/>
                
                { fav ?  
                
                    <CButton color='danger' variant='outline' onClick={handleUnFav} >Unfavorite Item</CButton> 
                
                    :   
                    
                    <CButton color='success' variant='outline' onClick={handleFavorite} >Favorite Item</CButton>
                    
                }
                {/* <CButton onClick={handleFavorite} href="#">Favorite Item</CButton> */}

                <br/> 
                <br/>

                {props.type === "shop" ?  
                
                <><CButton color='warning' shape='rounded-pill' onClick={handleItemPopup}>Edit Item</CButton><CButton style={{marginLeft:10}} color='danger' shape='rounded-pill' onClick={handleDeleteItem}>Delete Item</CButton></>  

                :  ""}
                
            </CCardBody>
            </CCard>
            
            {/* </button> */}
            <br/>
             

        </div>     
        
    );
}

// Item.propTypes = {
//   product: React.PropTypes.object.isRequired
// };


export default Item;
