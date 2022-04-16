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

                const index = state.items.findIndex(item => item.item_ID == action.payload.id) //finding index of the item
                const newArray = [...state.items]; //making a new array
                newArray[index].quantity = parseInt(action.payload.quantity, 10)//changing value in the new array
                newArray[index].totalPrice = (Number(newArray[index].price) * Number(action.payload.quantity)).toFixed(2)//changing value in the new array
                newArray[index].totalPrice = Number(newArray[index].totalPrice);
                return { 
                    ...state, //copying the orignal state
                    items: newArray, //reassingning items to new array
                }
           }

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