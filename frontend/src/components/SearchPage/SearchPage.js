import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { CContainer, CRow } from '@coreui/react';
import ItemList from '../Item/ItemList';

const SearchPage = () => {

    const [items,setItems] = useState([]);
    const {query} = useParams();

    useEffect( () => {

        async function getItem(){
            axios.get("http://localhost:3001/api/v1/items/searchitem/"+query)
            .then(response => {
                if(response){
                    setItems(response.data);
                    console.log("Items for query: ", query)
                }
                else{
                    console.log('No Such Item Exist');
                }
            });
        }

        getItem();
    },[setItems]);

    console.log(items)

    return (
        <div className='App'>
            
            <br/>
            <br/>

            <b>Showing {items.length} results for: "{query}"</b>

            <br/>
            <br/>
            <br/>
            <br/>
            {items.length > 0 ? 
            
            <CContainer>
            <CRow xs={{ cols: 4 }}>
                <ItemList items={items}/>
            </CRow>
            </CContainer>
        
        : 
        
        <p >No such item "{query}" is available on the Platform. Please search another Item</p>}
        {/* {{valid ? items.map(({ item_ID, name, description, quantity }) => (
            <p key={item_ID}>Item name: {name},Description {description}, Quantity: {quantity}.</p>
        )) : <p>NO ITEMS in this Shop</p>}} */}
        </div>
        
    );
}

export default SearchPage;