import { combineReducers } from "redux";
import loggedReducer from './logged'
import changeCountryReducer from './changeCountry'
import changeCurrencyReducer from './changeCurrency'
import cartReducer from "./cart";
import ordersPerPageReducer from "./orders";

const allReducers = combineReducers(
    {
        LOGGED:loggedReducer,
        COUNTRY: changeCountryReducer,
        CURRENCY:changeCurrencyReducer,
        CART:cartReducer,
        ORDERS_PER_PAGE:ordersPerPageReducer
    }
);

export default allReducers;