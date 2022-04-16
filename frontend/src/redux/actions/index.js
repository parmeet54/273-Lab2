import 
{ LOGIN, LOGOUT, CHANGE_CURRENCY, CHANGE_COUNTRY,  ADD_TO_CART, 
REMOVE_FROM_CART, MODIFY_QUANTITY, DELETE_CART, ADD_GIFT } 
from "../constants/action-types"

// Login Action
export const login = () => {
    return{
        type:LOGIN
    }
}

// Logout Action
export const logout = () => {
    return{
        type:LOGOUT
    }
}

// Change Country Action
export const changeCountry = (data) => {
    return{
        type:CHANGE_COUNTRY,
        payload:data
    }
}

// Change Currency Action
export const changeCurrency = (data) => {
    return{
        type:CHANGE_CURRENCY,
        payload:data
    }
}

// Add to Cart
export const addToCart = (data) => {
    return{
        type:ADD_TO_CART,
        payload:data
    }
}

// Remove from Cart
export const removeFromCart = (item_ID) => {
    return{
        type:REMOVE_FROM_CART,
        payload:{id: item_ID}
    }
}

// Increment Cart Item
export const modifyQuantity = (data) => {
    return{
        type:MODIFY_QUANTITY,
        payload:{
            id: data.id,
            quantity: data.quantity
        }
    }
}

// Delete Cart
export const emptyCart = () => {
    return{
        type:DELETE_CART
    }
}

// Add Gift
export const addGift = (data) => {
    return{
        type:ADD_GIFT,
        payload:{
            id:data.id,
            gift : data.gift,
            gift_desc: data.gift_desc
        }
    }
}