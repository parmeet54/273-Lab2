import { LOGIN, LOGOUT } from "../constants/action-types"

const loggedReducer = (state = false, action) => {

    switch(action.type){
        case LOGIN: return state = true;
        case LOGOUT: return state = false;
    }
}

export default loggedReducer;