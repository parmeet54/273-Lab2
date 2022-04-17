import { ADJUST_ORDERS_PER_PAGE} from "../constants/action-types";

const ordersPerPageReducer = (state = 5, action) => {

    switch(action.type){
        case ADJUST_ORDERS_PER_PAGE: 
            return state = Number(action.payload);
        default: 
            return state;
    }
}

export default ordersPerPageReducer;