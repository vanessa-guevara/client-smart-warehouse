import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Input from '../../components/Input/Input';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import axios from 'axios';
import { useState, useEffect } from 'react';
import './SalesOrders.scss'
import Left from '../../components/Left/Left';
const style = {
    py: 0,
    width: '100%',

    borderRadius: 2,
    border: '1px solid',
    borderColor: 'divider',
    backgroundColor: 'background.paper',
};



function Orders({ type }) {
    const [orders, setOrders] = useState([]);
    const token = sessionStorage.getItem("token");
    const [searchTerm, setSearchTerm] = useState('');
    const [searchError, setSearchError] = useState(false);
    const [listOrders, setListOrders] = useState([]);

    const navigate = useNavigate();

    const URL =process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchSalesOrder = async () => {

            try {

                const response = await axios.get(`${URL}/orders/${type}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
                );
                const orders = response.data;
                setOrders(orders);
                setListOrders(orders)
                console.log(orders)

            }
            catch (error) {
                console.error("Error getting orders:", error);
            }

        };

        fetchSalesOrder();
    }, []);

    const path = type === 'sales' ? "delivery/sales-detail" : "good-receipt/purchase-detail";
    const handleClick = (id) => navigate(`/${path}/${id}`);


    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        if (!value.trim()) {
            setOrders(listOrders); 
            setSearchError(false);
        }
    };

    const handleSearch = () => {
        if (!searchTerm) {
            setSearchError(true);
            return;
        }
        const filteredOrders = listOrders.filter(order =>
            order.OrderID.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.BusinessPartnerName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setOrders(filteredOrders);
        setSearchError(filteredOrders.length === 0);
    };



    return (
        <div className='order'>
            <div className='order__header'>

                <div className='order__titles'>
                    <Left />
                    <h2> {type === 'sales' ? " Sales Orders Open for Delivery" : "Purchase Orders for Receipt"}</h2>
                </div>
                <div className='order__titles1'>


                    <Input label="Order #" onChange={handleSearchChange}
                     onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSearch();
                            e.preventDefault();
                        }
                    }} />
                    <Button variant="contained"
                        onClick={handleSearch}
                        type="button"
                        text="Search"
                        onChange={handleSearchChange}
                        value={searchTerm}
                        helperText={searchError ? "Input order id " : ""}
                       

                    />


                </div>
            </div>
            <ul className='inventory__list'>

                {orders
                    .filter(order => order.Status === 'Open')
                    .map((order) => {
                        return (

                            <ListItemButton sx={{ width: '100%' }} onClick={() => handleClick(order.OrderID)}>
                                <div className='inventory__item'>

                                    <ListItemAvatar>
                                        <Avatar>
                                            <ImageIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <div className='inventory__container'>
                                        <div className='inventory__info'>
                                            <ListItemText primary={'#' + order.OrderID + "- " + order.BusinessPartnerName} secondary={new Date(order?.OrderDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} />
                                        </div>


                                        <div className='inventory__group'>
                                            <ListItemText primary={order.Status} />
                                        </div>
                                    </div>
                                </div>

                            </ListItemButton>

                        )


                    })}


            </ul>
        </div>
    );
}
export default Orders