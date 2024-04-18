
import ListItemText from '@mui/material/ListItemText';
import { TextField } from '@mui/material';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import Left from '../../components/Left/Left';
import { useParams } from 'react-router-dom';
import Autocomplete from '@mui/material/Autocomplete';
import Quantity from '../../components/Quantity/Quantity';
function InventoryTransaction({ type }) {

    const navigate = useNavigate();
    const params = useParams();

    const [order, setOrder] = useState();

    const [locationsByItem, setLocationsByItem] = useState('');


    const [highlightedItem, setHighlightedItem] = useState(null);
    const [incrementCounters, setIncrementCounters] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [searchError, setSearchError] = useState(false);
    const itemRefs = useRef([]);
    const token = sessionStorage.getItem("token");
    const [formQuantities, setFormQuantities] = useState({});
    const [locationSelections, setLocationSelections] = useState({});
    const [locationError, setLocationError] = useState([false])
    const [qtyError, setQtyError] = useState([])


    const [formData, setFormData] = useState();

    const URL = process.env.REACT_APP_API_URL;
    const path = type === 'sales' ? "/delivery" : "/good-receipt"



    useEffect(() => {
        const fetchOrders = async () => {

            try {

                const response = await axios.get(`${URL}/inventoryTransaction/${params.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
                );
                const order = response.data;
                console.log(response.data)
                setOrder(order);
                getLocationsForOrder(order);


            }
            catch (error) {
                console.error("Error getting items:", error);
            }

        };

        fetchOrders();
    }, []);







    useEffect(() => {
        itemRefs.current = itemRefs.current.slice(0, order?.orderdetails.length);
    }, [order?.orderdetails]);




    const getLocationsForOrder = async (order) => {
        try {


            const promises = order?.orderdetails.map(async (item) => {
                const response = await axios.get(`${URL}/locations/item/${item.ItemID}`, {
                    headers: { Authorization: `Bearer ${token}` }


                });
                return { itemId: item.ItemID, locations: response.data };
            });

            const results = await Promise.all(promises);
            const locations = results.reduce((acc, { itemId, locations }) => {
                acc[itemId] = locations;
                return acc;
            }, {});
            setLocationsByItem(locations);
        } catch (error) {
            console.error("Error getting locations for order:", error);
        }
    };



    const handleSearchChange = (e) => {

        setSearchTerm(e.target.value);
    };

    //select highlight




    const handleSearchClick = () => {
        if (!searchTerm) {
            setSearchError(true);
            return;
        }

        let found = false;
        const updatedIncrementCounters = { ...incrementCounters };

        order?.orderdetails.forEach((item) => {
            if (item.ItemID.toString() === searchTerm || item.ItemName.toLowerCase().includes(searchTerm.toLowerCase())) {
                found = true;
                setHighlightedItem(item.ItemID.toString());

                const currentCount = updatedIncrementCounters[item.ItemID] || 0;
                updatedIncrementCounters[item.ItemID] = currentCount + 1;
            }
        });

        if (found) {
            setIncrementCounters(updatedIncrementCounters);
        } else {
            //
        }

        setSearchTerm('');
    };



    useEffect(() => {
        const highlightedIndex = order?.orderdetails.findIndex(item => item.ItemID.toString() === highlightedItem);

        if (highlightedIndex >= 0 && itemRefs.current[highlightedIndex]) {
            itemRefs.current[highlightedIndex].scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    }, [highlightedItem, order?.orderdetails]);





    /// quantity change

    const handleQuantityChange = (e, itemId, maxQuantity) => {
        const newQuantity = parseInt(e.target.value, 10);

        setQtyError(prevErrors => ({
            ...prevErrors,
            [itemId]: newQuantity > maxQuantity,
        }));

        setLocationError(prevErrors => ({
            ...prevErrors,
            [itemId]: newQuantity > 0 && !locationSelections[itemId],
        }));

        if (newQuantity <= maxQuantity) {

            setIncrementCounters(prevCounters => ({
                ...prevCounters,
                [itemId]: newQuantity
            }));

            setFormQuantities(prevQuantities => ({
                ...prevQuantities,
                [itemId]: newQuantity
            }));

        }

    };


    const handleCommentChange = (e) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            comments: e.target.value
        }));
    };

    const handleSubmitForm = async (event) => {
        event.preventDefault();

        //////////in review///////////////////// for quantities
        //validation for locations

        console.log(qtyError)

        const hasQtyErrors = Object.values(qtyError).some(e => e);
        const hasLocationErrors = Object.values(locationError).some(e => e);

        if (hasQtyErrors || hasLocationErrors) {
            alert("Please check the quantities and locations before submitting.");
            return;
        }

        const updatedOrderDetails = order.orderdetails
            .filter(item => incrementCounters[item.ItemID] !== undefined)
            .map(item => ({
                ItemID: item.ItemID,
                ItemName: item.ItemName,
                Quantity: incrementCounters[item.ItemID],
                LocationID: locationSelections[item.ItemID]?.LocationID,
                OrderDetailID: item.DetailID,




            }));


        const updatedFormData = {
            ...formData,
            orderDetails: updatedOrderDetails,
            order: {
                ...formData?.order,
                OrderId: order.order.OrderID,
                BusinessPartnerCode: order.order.BusinessPartnerCode,
                BusinessPartnerName: order.order.BusinessPartnerName,
                Address: order.order.Address,
                City: order.order.City,
                Country: order.order.Country,
                Comments: formData?.comments,
                WarehouseID: order.order.WarehouseID,
                Type: type === 'sales' ? "Out" : "In",
            },
        };


        setFormData(updatedFormData);


        console.log(updatedFormData);







        //call api post delivery

        if (updatedFormData && updatedFormData.order && updatedFormData.orderDetails) {
            try {
                console.log(updatedFormData)
                const response = await axios.post(`${URL}/inventoryTransaction`, updatedFormData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }



                });

                alert(response.data.message);
                navigate('/delivery')

            } catch (error) {
                console.error('Error creating  delivery:', error);

            }
        }




    };


    console.log(type)
    return (

        <section className='sales1'>
            <div className='inventory__list1'>
                <div className='order__header'>
                    <div className='order__titles'>
                        <Left />
                        <h2 >{type === 'sales' ? "Delivery" : "Good Receipt"}</h2>
                    </div>

                    <div className='order__titles1'>
                        <Button variant="contained"
                            onClick={() => navigate(path)}
                            type="button"
                            text={type === 'sales' ? "New Delivery" : "New Good Receipt"}

                        />
                    </div>
                    {/* <div className='order__titles1'>
                    <Input label="Item #"
                        onChange={handleSearchChange}
                        value={searchTerm}
                        helperText={searchError ? "Input item id or name" : ""}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSearchClick();
                                e.preventDefault();
                            }
                        }} />

                    <Button variant="contained"
                        onClick={handleSearchClick}
                        type="button"
                        text="Search" />

                </div> */}
                </div>
                <div className='sales__header'>
                    {/* <h3 className='sales__titleswh'>{order?.order.WarehouseName}</h3> */}
                    <div className='sales__container-header'>


                        <div>
                            <h3>Inventory Transaction#: {order?.order.ID}</h3>
                            <p>Baso on Order#: {order?.order.OrderID}</p>
                            <p>Status {order?.order.Status}</p>

                        </div>


                        <div>
                            <h3>{type === 'sales' ? "Customer Info" : "Vendor Info"}</h3>
                            <p>{order?.order.BusinessPartnerName}</p>
                            <p>{order?.order.Address}</p>
                            <p>{order?.order.City}</p>
                        </div>



                        
                    </div>
                    <h3>Comments:</h3>
                        <p>{order?.order.Comments}</p>
                </div>

                <div className='sales__container1'>
                    <div className='sales__info'>
                        <div className='sales__detail'>
                            <div className='sales__info'>
                                <ListItemText primary="Item" />
                            </div>
                            <div className='sales__info'>
                                <ListItemText primary="Quantity" />
                            </div>

                            <div className='sales__info'>
                                <ListItemText primary='unit' />
                            </div>
                        </div>
                    </div>
                </div>



                <form className='sales__form' onSubmit={handleSubmitForm}>
                    <div className='sales__details'>



                        {order?.orderdetails

                            .map((item, index) => {
                                return (

                                    <div className='sales__item' key={item.ItemID}>
                                        <div
                                            key={item.ItemID}
                                            className={`sales__item ${item.ItemID.toString() === highlightedItem ? 'highlighted' : ''}`}
                                            ref={el => itemRefs.current[index] = el}
                                        >


                                            <div className='sales__container'>

                                                <div className='sales__info'>
                                                    <div className='sales__detail'>
                                                        <div className='sales__info'>
                                                            <ListItemText primary={item.ItemID + '-' + item.ItemName} />
                                                        </div>
                                                        <div className='sales__info'>
                                                            <ListItemText secondary={item.Quantity} />
                                                        </div>

                                                        <div className='sales__info'>
                                                            <ListItemText primary={'unit'} />
                                                        </div>
                                                    </div>




                                                    <div className='sales__group'>
                                                        {/* <span>Quantity:</span>
                                                    <ListItemText primary={item.Quantity} /> */}
                                                        {/* <ListItemText primary={'unit'} /> */}



                                                    </div>

                                                </div>

                                            </div>
                                        </div>


                                    </div>




                                )


                            })}

                        <div className='sales__footer'>


                        </div>
                    </div>
                </form>

            </div>
        </section>

    )
}
export default InventoryTransaction