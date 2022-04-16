import React from 'react';
import {useEffect, useState} from 'react';
import { CCol, CRow, CImage, CButton, CFormCheck, CFormSelect } from '@coreui/react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart , modifyQuantity, addGift } from '../../redux/actions';

function CartItem(props) {

    const currency = useSelector(state=> state.CURRENCY);
    const dispatch = useDispatch();

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
            dispatch(removeFromCart(item_ID));
    }
    
    const handleAddGift = (Item_ID)=> {

    }

    return (
        
        <div>
            <br/>
            <br/>

            <CRow>
                <CCol>
                    <CButton color='danger' variant='outline' onClick={() => handleRemoveItem(props.item.item_ID)}>Remove</CButton>
                </CCol>
                <CCol>
                    <CImage orientation="top"  src={props.item.image} width={100} height={100}/>
                </CCol>
                <CCol><h4>{props.item.name}</h4></CCol>
                <CCol  >
                    <CFormSelect  value={props.item.quantity} onChange={(e) => handleQuantityAdjust(props.item.item_ID, e.target.value)}>
                        {createSelectItems(props.item.stock)}
                    </CFormSelect>
                </CCol>
                <CCol>
                    <CFormCheck id="flexCheckDefault"/>
                </CCol>
                <CCol><h4>{currency}{props.item.totalPrice}</h4></CCol>
            </CRow>
        </div>     
    );
}

export default CartItem;
