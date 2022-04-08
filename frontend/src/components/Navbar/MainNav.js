import React , {Component, useEffect, useState} from 'react';
import { Navigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import {Navbar, Nav, Container, Form, FormControl, Button, NavDropdown} from 'react-bootstrap';

import { CNavbar, CContainer, CNavbarBrand, CCollapse, CNavbarNav, CNavItem, CNavLink,
    CDropdown, CDropdownToggle, CDropdownItem, CDropdownMenu, CDropdownDivider, CForm, CFormInput, CButton } from '@coreui/react/';
import axios from 'axios';

const MainNav = (props) => {

    const [query, setQuery]= useState("");
    const navigate = useNavigate();
    const[isLogged, setLoggedIn] = useState(false);

    useEffect(()=> {
        if(sessionStorage.getItem("token")!= null){
            setLoggedIn(true);
        }
        
    },[]);

    const handleSearchChange = (e) => {
        setQuery(e.target.value)
    }

    const handleSearchSubmit = () => {
        navigate("/search/"+query);
        window.location.reload(false);
    }

    const handleUserShopNav = () => {
        //axios.get(by username)
        //.then(store in sesssion storage)
        navigate("/shop/"+sessionStorage.getItem("shop"));
    }

    const handleLogout = () => {
        setLoggedIn(false);
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("shop");
        navigate("/login")
    }
    
    return(
        <div>
            <>
                <CNavbar expand="lg" colorScheme="light" className="bg-light">
                <CContainer breakpoint="md">
                    <CNavbarBrand href="/"> <img className='logo-center' src="/Etsy_logo.png" alt="Etsy Nav logo" width={50} height={25} style={{marginRight:30}}></img> </CNavbarBrand>
                    <CNavbarNav>
                        <CNavItem>
                        <CNavLink href="/" active style={{marginRight:40}}>
                            Home
                        </CNavLink>
                        </CNavItem>
                    </CNavbarNav>
                    <CForm className="d-flex">
                        {/* <CFormInput onChange={handleSearchChange} type="search" className="me-2" placeholder="Search Any Item" width={2000} /> */}
                        <input onChange={handleSearchChange} type='search bar' name="search" placeholder='Search Any Item'></input>
                        <CButton onClick={handleSearchSubmit} type="submit" color="success" variant="outline" style={{marginRight:30}}>
                        Search
                        </CButton>
                    </CForm>
                    <CNavbarNav>
                        <CNavItem>
                        <CNavLink href="/profile" active style={{marginRight:30}}>
                        Favorites
                        </CNavLink>
                        </CNavItem>

                        <CNavItem>
                        <CNavLink href="/profile" active style={{marginRight:30}}>
                        Profile
                        </CNavLink>
                        </CNavItem>
                        
                        <CNavItem>
                        <CNavLink onClick={handleUserShopNav} active style={{marginRight:30}}>
                        My Shop
                        </CNavLink>
                        </CNavItem>

                        <CNavItem>
                        <CNavLink href="/cart" active style={{marginRight:30}} >
                        Cart
                        </CNavLink>
                        </CNavItem>

                        <CNavItem>

                            {isLogged ?  
                                <CButton onClick={handleLogout}>
                                    Logout
                                </CButton> 
                                :
                                ""
                            }
                        
                        </CNavItem>
                    </CNavbarNav>
                </CContainer>
                </CNavbar>
            </>

            {/* <img className='logo-center' src="/Etsy_logo.png" alt="Etsy Nav logo" width={50} height={25} style={{marginRight:50}}></img>
            <Link to="/" className="btn btn-primary" style={{marginRight:50}} >Home</Link>
            <input onChange={handleSearchChange} type='search bar' name="search" placeholder='Search Any Item'></input>
            <button onClick={handleSearchSubmit} type="submit" style={{marginRight:50}}>Search</button>
            <Link to="/profile" className="btn btn-primary" style={{marginRight:50}}>Favorites</Link>
            <Link to="/profile" className="btn btn-primary" style={{marginRight:50}}>User Profile</Link>
            <Link to="/shop/" className="btn btn-primary" style={{marginRight:50}}>Shop Page</Link>
            <button onClick={handleUserShopNav}>My Shop</button>
            <Link to="/cart" className="btn btn-primary">Cart</Link> */}


        </div>

    )
}

            
    


export default MainNav;