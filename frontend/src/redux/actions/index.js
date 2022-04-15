import 
{ LOGIN, LOGOUT, CHANGE_CURRENCY, CHANGE_COUNTRY,  ADD_TO_CART, 
REMOVE_FROM_CART, INCREMENT_CART_ITEM, DECREMENT_CART_ITEM, DELETE_CART, ADD_GIFT } 
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
export const removeFromCart = (data) => {
    return{
        type:REMOVE_FROM_CART,
        payload:data
    }
}

// Increment Cart Item
export const incrementItem = (data) => {
    return{
        type:INCREMENT_CART_ITEM,
        payload:data
    }
}

// Decrement Cart Item
export const decrementItem = (data) => {
    return{
        type:DECREMENT_CART_ITEM,
        payload:data
    }
}

// Delete Cart
export const deleteCart = () => {
    return{
        type:DELETE_CART
    }
}

// Add Gift
export const addGift = (data) => {
    return{
        type:ADD_GIFT,
        payload:data
    }
}