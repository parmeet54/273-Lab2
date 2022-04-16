import { ADD_TO_CART, REMOVE_FROM_CART, 
    MODIFY_QUANTITY, DELETE_CART, ADD_GIFT } from "../constants/action-types"

const cartReducer = (state = {items:[]}, action) => {

    switch(action.type){

        case ADD_TO_CART: 
            return { 
                ...state,
                items: [action.payload, ...state.items]
            }

        case REMOVE_FROM_CART: 

            console.log(action.payload.id)
            return state = {
                ...state,
                items: state.items.filter(item => item.item_ID !== action.payload.id) 
            }

        case MODIFY_QUANTITY: {

                const index = state.items.findIndex(item => item.item_ID == action.payload.id);
                const newArray = [...state.items]; 
                newArray[index].quantity = parseInt(action.payload.quantity, 10);
                newArray[index].totalPrice = (Number(newArray[index].price) * Number(action.payload.quantity)).toFixed(2);
                newArray[index].totalPrice = Number(newArray[index].totalPrice);
                return { 
                    ...state,
                    items: newArray,
                }
           }

        case DELETE_CART: 
            return {
                items:[]
            }

        case ADD_GIFT:{
            const index = state.items.findIndex(item => item.item_ID == action.payload.id)
            const newArray = [...state.items];
            newArray[index].gift = action.payload.gift  
            newArray[index].gift_desc = action.payload.gift_desc
            return { 
                ...state,
                items: newArray,
            }
        }


        default: 
            return state;
    }
}

export default cartReducer;