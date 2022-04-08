import React , {useEffect, useState} from 'react';
import axios from 'axios';
import { Navigate,useNavigate } from 'react-router';
import { CInput, CButton } from '@coreui/react';

const CreateShop = () => {
    const[name, setName] = useState("");
    const[available, setAvailability] = useState();
    const[created, setCreated] = useState();
    const[shops, setShops]= useState([]);
    const[note, setNote]= useState("");
    const[shopID,setShopID]= useState("");
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3001/api/v1/shops/")
        .then((response) => {
            if(response){
                setShops(response.data);
                console.log(shops);
            }
        });

    },[]);

    
    const handleNameChange = (e) => {
        setName(e.target.value)
      
    }

    const handleAvailabiliy = () => {

        if(shops.find(c => c.name == name)){
            setAvailability(false);
            setNote("Choose another name");
        }
        else{
            setAvailability(true);
        }
        console.log(available);

    }

    const handleSubmit = () => {

        var theRandomNumber = Math.floor(Math.random() * 999) + 1;
    
        const data= {
            username:sessionStorage.getItem("token"),
            shop_ID:theRandomNumber,
            name: name,
            total_sales:0,
            image:"/default-shop.jpeg"
        }
        if(available){
            axios.post("http://localhost:3001/api/v1/shops", data)
            .then(response => {
                console.log(response);
                if(response.status === 200){
                    //setShop(data.shop_ID)
                    setCreated(true);
                    sessionStorage.setItem("shop", data.shop_ID);
                    console.log("Shop Created", data.shop_ID)
                    setShopID(data.shop_ID)
                    navigate("/shop/"+data.shop_ID);
                }
                else{
                    console.log(response);
                }
            })
        }    
      }

    // let redirectVar = null;
    // if(created === true){
    //     redirectVar = <Navigate to= "/shop/" ${shopID}>
    // }

    return(
        
        <><div className='App'>
            {/* {redirectVar} */}
            <br/>            
            <br/>
            <br/>
            <br/>

            <br /><h1>Create New Shop</h1>

            <br /><h2>Name your Shop something Unique and Special!</h2>

            <br />
            <br />
            <br />
            <input onChange={handleNameChange} type='text' name="name" placeholder='Shop Name' style={{ marginLeft: 20, width:400, height:37 }} ></input>
            <CButton color='info' variant='outline' onClick={handleAvailabiliy}>Check Availability</CButton>

            {/* <button onClick={handleAvailabiliy}>Check Availability</button> */}
            <br/><h3>{available== true ? "Available": available== false ? "Not Available" : ''}</h3>
            <br/>
            <br/><CButton color='success' onClick={handleSubmit}>Create Shop</CButton>
            <br/> 
            
        </div>
       </>
    )
}

export default CreateShop;
