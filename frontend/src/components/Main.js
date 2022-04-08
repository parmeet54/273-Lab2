import React , {Component} from 'react';
import {Route, Routes} from 'react-router-dom';
import Signup from './SignUp/Signup';
import Login from './Login/Login';
import MainNav from './Navbar/MainNav';
import Profile from './Profile/Profile';
import UpdateProfile from './Profile/UpdateProfile';
import Homepage from './HomePage/Homepage';
import Cart from './Cart/Cart';
import ShopPage from './Shop/ShopPage';
import CreateShop from './Shop/CreateShop';
import SearchPage from './SearchPage/SearchPage';
import ItemPage from './Item/ItemPage';
import OrderPage from './OrderPage/OrderPage'
import axios from 'axios';

class Main extends Component {

    render(){
        if(sessionStorage.getItem("currency") == null){
            sessionStorage.setItem("currency", "$")
        }
        return(
            <><div>
                <MainNav />
            </div>
            
            <Routes>


                <Route path="/" element={<Homepage />}/>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/updateprofile" element={<UpdateProfile />} />
                <Route path="/cart" element={<Cart />} />
                {/* <Route path="/shop/" element={<ShopPage shop={shop}   />} /> */}
                <Route path="/shop/:id" element={<ShopPage />} />
                <Route path="/createShop" element={<CreateShop/>}/>
                <Route path="/search/:query" element={<SearchPage/>}/>
                <Route path="/item/:id" element={<ItemPage/>}/>
                <Route path="/orders" element={<OrderPage/>}/>

                {/* <Route path="/" element={<Homepage />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/updateprofile" element={<UpdateProfile />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/shop/:id" element={<ShopPage />} />
                <Route path="/createShop" element={<CreateShop/>}/>
                <Route path="/search/:query" element={<SearchPage/>}/>
                <Route path="/item/:id" element={<ItemPage/>}/>
                <Route path="/orders" element={<OrderPage/>}/> */}

            </Routes>
            </>
            
        )
    }
}

export default Main;