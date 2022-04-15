import { ADD_TO_CART, REMOVE_FROM_CART, INCREMENT_CART_ITEM, 
    DECREMENT_CART_ITEM, DELETE_CART, ADD_GIFT } from "../constants/action-types"

const cartReducer = (state = {items:[]}, action) => {

    switch(action.type){

        case ADD_TO_CART: 
            return { // returning a copy of orignal state 
                ...state, //spreading the original state
                items: [action.payload, ...state.items] // new todos array
            }

        case REMOVE_FROM_CART: 
            return state = []

        case INCREMENT_CART_ITEM: 
            return state = []

        case DECREMENT_CART_ITEM: 
            return state = []

        case DELETE_CART: 
            return {
                items:[]
            }

        case ADD_GIFT:
            return state = []

        default: 
            return state;
    }
}

export default cartReducer;