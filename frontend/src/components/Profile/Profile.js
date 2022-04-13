import React , {useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Navigate } from 'react-router';
import FavItems from './FavItems';
import { CContainer, CRow, CCol, CButton } from '@coreui/react';

const Profile = () => {
    const[username, setUsername] = useState("");
    const[name, setName] = useState("");
    const[email, setEmail] = useState("");
    const[image,setImage] = useState("");
    const[user, setUser] = useState({});
    const[favItems,setFavItems] = useState([]);
    const userShop = sessionStorage.getItem("shop")
    const[hasShop, setHasShop] = useState(false);
 

    useEffect(() => {
        axios.get("http://localhost:3001/api/v1/users/" + sessionStorage.getItem("token"))
        .then((response) => {
            setUser(response.data);
            setUsername(response.data.username);
            setName(response.data.name);
            setEmail(response.data.email);
            setImage(response.data.image);
            //console.log(response.data[0]);
        });
        console.log("Username:", username);

        axios.get("http://localhost:3001/api/v1/items/")
        .then(response => {
            setFavItems(response.data.filter(item =>item.fav === "1"));
        })

        if(userShop != "undefined"){
            setHasShop(true);
        }

    },[]);

    
    return(
        <><div className='App'>
            {/* {seen ? <ShopPopup name="TESTING" toggle={handlePopup} /> : null} */}

            <br/><br/>

            <CContainer>
                <CRow>
                <CCol > <img src={image} width={300}/></CCol>
               
                <CCol>
                    <br/>

                    <br /><h1><b>{name}</b></h1>

                    <br />My Email: <b>{email}</b>

                    <br />My Username: <b>{username}</b>

                    <br />
                    <br />
                    <Link to="/updateProfile" state={{ user: user }} className="btn btn-primary">Update Profile</Link>


                </CCol>
                <CCol>

                    <br/>
                    <br/>
                    <br/>

                    <Link to="/orders"  className="btn btn-primary">View My Orders</Link>

                    <br/>
                    <br/>
                    <br/>
                    {hasShop  ? 

                        ""
                    :

                        <Link to="/createshop"  className="btn btn-primary">Create Shop</Link>
                    }

                    
                </CCol>


                </CRow>
            </CContainer>
            

            
            {/* <br />User Profile here, Hello <b>{name}</b>

            <br />My Email is <b>{email}</b>

            <br />My Username is <b>{username}</b>

            <br />
            <br />
            <Link to="/updateProfile" state={{ user: user }} className="btn btn-primary">Update Profile</Link>

            <Link to="/orders" style={{marginLeft:100}} className="btn btn-primary">View My Orders</Link>

            {hasShop  ? 

                ""
            :

                <Link to="/createshop"  className="btn btn-primary">Create Shop</Link>
            } */}

            <br/>
            <br/>
            <br/>
            <br/>
            <div>
                <FavItems favItems={favItems}/>
            </div>

        </div>
       </>
    )
}

export default Profile;
