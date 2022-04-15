import { combineReducers } from "redux";
import loggedReducer from './logged'
import changeCountryReducer from './changeCountry'
import changeCurrencyReducer from './changeCurrency'

const allReducers = combineReducers(
    {
        LOGGED:loggedReducer,
        COUNTRY: changeCountryReducer,
        CURRENCY:changeCurrencyReducer
    }
);

export default allReducers;