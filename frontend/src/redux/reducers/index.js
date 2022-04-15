import { combineReducers } from "redux";
import loggedReducer from './logged'
import changeCountryReducer from './changeCountry'
import changeCurrencyReducer from './changeCurrency'
import cartReducer from "./cart";

const allReducers = combineReducers(
    {
        LOGGED:loggedReducer,
        COUNTRY: changeCountryReducer,
        CURRENCY:changeCurrencyReducer,
        CART:cartReducer
    }
);

export default allReducers;