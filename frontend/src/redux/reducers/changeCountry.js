import { CHANGE_COUNTRY } from "../constants/action-types"

const changeCountryReducer = (state , action) => {

    switch(action.type){
        case CHANGE_COUNTRY: 
            return state = action.payload;
        default: 
            return state = "United States";
    }
}

export default changeCountryReducer;