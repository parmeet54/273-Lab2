import { CHANGE_CURRENCY } from "../constants/action-types"

const changeCurrencyReducer = (state , action) => {

    switch(action.type){
        case CHANGE_CURRENCY: 
            return state = action.payload;
        default: 
            return state = "$";
    }
}

export default changeCurrencyReducer;