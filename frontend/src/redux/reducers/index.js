import { combineReducers } from "redux";
import loggedReducer from './logged'


const allReducers = combineReducers(
    {
        LOGGED:loggedReducer
    }
);

export default allReducers;