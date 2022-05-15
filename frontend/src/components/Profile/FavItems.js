// import React, { memo, useEffect, useMemo, useState } from 'react';
// import axios from 'axios';
// import { CContainer, CRow, CButton, CForm } from '@coreui/react';
// import ItemList from '../Item/ItemList';

// const FavItems = (props) => {
//     const favItems = props.favItems;
//     const [queryItems, setQueryItems] = useState({});
//     const [query, setQuery] = useState("");
//     const [searched, setSearched] = useState(false);

//     const handleSearchChange = (e) => {
//         setQuery(e.target.value);
//     }

//     const handleSearchSubmit = () => {
//         setQueryItems(favItems.filter(item => item.name.toLowerCase().includes(query)));
//         setSearched(!searched);
//     }

//     return (
//         <><div className='App'>

//             <CForm className="d-flex justify-content-center">
//                 <h2>Favorite Items: </h2><input onChange={handleSearchChange} type='search bar' name="search" placeholder='Search Favorite Item(s)' style={{ marginLeft: 200 }}></input>
//                 <CButton onClick={() => handleSearchSubmit} type="submit" color="success" variant="outline" style={{ marginRight: 50 }}>
//                     Search
//                 </CButton>
//             </CForm>
//             <br />
//             <br />
//             {favItems.length > 0 ?

//                 <CContainer>
//                     <CRow xs={{ cols: 4 }}>
//                         {searched ?

//                             <ItemList items={queryItems} />

//                             :

//                             <ItemList items={favItems} />

//                         }
//                         {/* <ItemList items={favItems}/> */}
//                     </CRow>
//                 </CContainer>

//                 :

//                 <p>No Items Favorited</p>}

//         </div>
//         </>
//     )
// }

// export default FavItems;
