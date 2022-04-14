
// Login Action
export const login = () => {
    return{
        type:'LOGIN'
    }
}

// Logout Action
export const logout = () => {
    return{
        type:'LOGOUT'
    }
}

// Change Country Action
export const changeCountry = (data) => {
    return{
        type:'CHANGE_COUNTRY',
        payload:data
    }
}

// Change Currency Action
export const changeCurrency = (data) => {
    return{
        type:'CHANGE_CURRENCY',
        payload:data
    }
}

// Add to Cart
export const addToCart = (data) => {
    return{
        type:'ADD_TO_CART',
        payload:data
    }
}

// Remove from Cart
export const removeFromCart = (data) => {
    return{
        type:'ADD_TO_CART',
        payload:data
    }
}

// Increment Cart Item
export const incrementItem = (data) => {
    return{
        type:'INCREMENT_CART_ITEM',
        payload:data
    }
}

// Decrement Cart Item
export const decrementItem = (data) => {
    return{
        type:'DECREMENT_CART_ITEM',
        payload:data
    }
}