import React from 'react';
import {useEffect, useState} from 'react';
import { CCol, CRow, CImage, CButton, CFormCheck, CFormSelect, 
    CModal, CModalBody, CModalHeader, CModalTitle, CModalFooter, CFormInput } from '@coreui/react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart , modifyQuantity, addGift } from '../../redux/actions';

function CartItem(props) {

    const currency = useSelector(state=> state.CURRENCY);
    const [checked, setChecked] = useState(false);
    const [visible, setVisible] = useState(false)
    const [giftDescription, setGiftDescription] = useState();
    const dispatch = useDispatch();

    const createSelectItems= (stock) => {
        let items = [];         
        for (let i = 0; i <= stock; i++) {             
             items.push(<option key={i} value={i}>{i}</option>);
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
    
    const handleDescriptionChange = (description) => {
        setGiftDescription(description);
        console.log("Gift Description:", giftDescription)
    }

    const handleAddGift = (item_ID) => {
        const data={
            id:item_ID,
            gift : true,
            gift_desc: giftDescription
        }

        console.log(data);
        dispatch(addGift(data));
    }

    return (
        
        <div>
            <br/>
            <br/>

            <CRow>
                <CCol>
                    <CButton color='danger' variant='outline' onClick={() => handleRemoveItem(props.item.item_ID)}>x</CButton>
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
                    <CFormCheck onChange={() => {setVisible(!visible); setChecked(!checked);}} checked={props.item.gift} id="flexCheckDefault"/>
                </CCol>
                <CCol><h4>{currency}{props.item.totalPrice}</h4></CCol>
            </CRow>

            <CModal visible={visible} onClose={() => setVisible(false)}>
            <CModalHeader onClose={() => setVisible(false)}>
                <CModalTitle>Gift Item!</CModalTitle>
            </CModalHeader>
            <CModalBody>
                Add Gift Description Below
                <CFormInput onChange={(e) => handleDescriptionChange(e.target.value)} type='text' placeholder='Description Here'></CFormInput>
            </CModalBody>
            <CModalFooter>
                <CButton color="secondary" onClick={() => {setVisible(!visible); setChecked(!checked);}}>
                Close
                </CButton>
                <CButton  onClick={() => {setVisible(false); handleAddGift(props.item.item_ID);}} color="primary">Gift Item</CButton>
            </CModalFooter>
            </CModal>
        </div>     
    );
}

export default CartItem;
