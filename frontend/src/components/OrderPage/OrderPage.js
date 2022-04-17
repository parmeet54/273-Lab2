import React , {useEffect, useState} from 'react';
import axios from 'axios';
import { CTable, CTableHead, CTableRow,CTableHeaderCell, CTableBody, 
    CTableDataCell, CFormSelect } from '@coreui/react';
import ReactPaginate from 'react-paginate'
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { adjustOrdersPerPage } from '../../redux/actions';


const OrderPage = () => {
    const [orders,setOrders] = useState([]);
    // const[orderItems,setOrderItems] = useState([]);
    const dispatch = useDispatch();
    // const [total, setTotal] = useState(0);
    const [hasOrders, setHasOrders] = useState(false);
    const currency = useSelector(state=> state.CURRENCY);

    const ordersPerPage = useSelector(state => state.ORDERS_PER_PAGE);

    const [pageNumber, setPageNumber] = useState(0);
    // const [ordersPerPage, setOrdersPerPage] = useState(2);
    const pagesVisited = pageNumber * ordersPerPage;
    const pageCount = Math.ceil(orders.length / ordersPerPage);

   
    const displayOrders = orders
        .slice(pagesVisited, pagesVisited + ordersPerPage)
        .map(({ order_ID, date_purc, total, items }) => {
            console.log("Orders:", pagesVisited +1, " to ",pagesVisited + ordersPerPage);
        
        return (
            <><CTable>
            <CTableHead color="light">
                <CTableRow>
                    <CTableHeaderCell> </CTableHeaderCell>
                    <CTableHeaderCell> </CTableHeaderCell>
                    <CTableHeaderCell scope="col"><h3>Order # {order_ID}</h3></CTableHeaderCell>
                    <CTableHeaderCell> </CTableHeaderCell>
                    <CTableHeaderCell scope="col"><h3>Date : {date_purc}</h3></CTableHeaderCell>
                    <CTableHeaderCell> </CTableHeaderCell>
                </CTableRow>
                <CTableRow/>
            </CTableHead>
            {items.map(({ image, name, shop, quantity, price, gift_desc }) => (
                <CTableBody>
                    <CTableRow>
                        <CTableHeaderCell align={'middle'} scope="row"><img src={image} width={120} height={100} /></CTableHeaderCell>
                        <CTableDataCell align={'middle'}>{name}</CTableDataCell>
                        <CTableDataCell align={'middle'}><b>{gift_desc}</b></CTableDataCell>
                        <CTableDataCell align={'middle'}>Shop: {shop}</CTableDataCell>
                        <CTableDataCell align={'middle'}>Quantity:{quantity}</CTableDataCell>
                        <CTableDataCell align={'middle'}>Price:{currency}{price}</CTableDataCell>
                    </CTableRow>

                </CTableBody>
            ))}
            <CTableRow></CTableRow>
            <CTableHeaderCell></CTableHeaderCell>
            <CTableHeaderCell></CTableHeaderCell>
            <CTableHeaderCell></CTableHeaderCell>
            <CTableHeaderCell></CTableHeaderCell>
            <CTableHeaderCell color="light"> <h3>Total: {currency}{total}</h3></CTableHeaderCell>

            </CTable><br /><br /></>
            );  
        });


    const changePage = ({selected}) => {
        setPageNumber(selected);
    }

    const handlePerPage = (e) => {
        dispatch(adjustOrdersPerPage(e.target.value));
        window.location.reload(false);
    }

    useEffect(() => {

        //dispatch(adjustOrdersPerPage(5))
        axios.get("http://localhost:3001/api/v1/orders/" + sessionStorage.getItem("token"))
            .then((response) => {
                if(response.status === 200){
                    const orders = response.data
                    setOrders(orders);
                    setHasOrders(true);

                    for(let i = 0; i < response.data.length; i++ ){
                        console.log("Order", i ,":", response.data[i].items)
                    }
                    console.log(response.data)
                }
            });
    },[]);


    // useEffect(() => {

    // },[ordersPerPage])


    return(
        <div className='App'>

            <br/>
            <br/>
            
            <h1>My Purchases</h1>
            <br/>
        
            <CFormSelect style={{width:100, justifyContent:'right'}} value={ordersPerPage} onChange={(e) => handlePerPage(e)}>
                <option key={2} value={2}>2</option>
                <option key={5} value={5}>5</option>
                <option key={10} value={10}>10</option>
            </CFormSelect>
            <br/>

            {displayOrders}
            <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"paginationBttns"}
                previousLinkClassName={"previousBttn"}
                nextLinkClassName={"nextBttn"}
                disabledClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}                    
            />                
        </div>
    )
}

export default OrderPage;

