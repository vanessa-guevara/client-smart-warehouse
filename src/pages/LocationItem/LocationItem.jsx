import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, ListItemButton, ListItemText, Typography } from '@mui/material';
import './LocationItem.scss';
import Checkbox from '@mui/material/Checkbox';

function LocationItem({ ItemID }) {
    const [items, setItems] = useState([]);
    const [defaultLocations, setDefaultLocations] = useState([]);
    const token = sessionStorage.getItem("token");
    const URL =process.env.REACT_APP_API_URL;


    useEffect(() => {
        async function fetchData() {
            try {
                const itemsResponsePromise = axios.get(`${URL}/locations/item/${ItemID}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const defaultLocationResponsePromise = axios.get(`${URL}/locations/default-item/${ItemID}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                const [itemsResponse, defaultLocationResponse] = await Promise.all([itemsResponsePromise, defaultLocationResponsePromise]);

                setItems(itemsResponse.data);
                setDefaultLocations(defaultLocationResponse.data);

                const uniqueWarehouses = new Set();
                itemsResponse.data.forEach(item => {
                    uniqueWarehouses.add(JSON.stringify({ name: item.WarehouseName, id: item.WarehouseID }));
                });

                if (itemsResponse.data.length === 0) {
                    defaultLocationResponse.data.forEach(loc => {
                        uniqueWarehouses.add(JSON.stringify({ name: loc.WarehouseName, id: loc.WarehouseID }));
                    });
                }

                setUniqueWarehouses(Array.from(uniqueWarehouses).map(json => JSON.parse(json)));
            } catch (error) {
                console.error("Error fetching location by items:", error);
            }
        }

        fetchData();
    }, [ItemID, URL, token]);

    const [uniqueWarehouses, setUniqueWarehouses] = useState([]);

    return (
        <List sx={{ py: 0, width: '100%', borderRadius: 2, border: '1px solid', borderColor: 'divider', backgroundColor: 'background.paper' }}>
            {uniqueWarehouses.map((warehouse) => (
                <React.Fragment key={warehouse.id}>
                    <li >
                        <div className='location__title'>
                        <h4 className='location__warehouse'>
                            {warehouse.name} - Default Location: {defaultLocations.find(loc => loc.WarehouseID === warehouse.id)?.LocationCode || 'N/A'}
                        </h4>
                        
                        </div>
                        {items.filter(item => item.WarehouseID === warehouse.id).map((item, index) => (
                            <ListItemButton key={index}>
                                <ListItemText primary={"Location Code: " + item.LocationCode} />
                                <ListItemText primary={"Stock: " + (item.Stock || 0)} />
                                <Checkbox/>
                            </ListItemButton>
                        ))}
                    </li>
                </React.Fragment>
            ))}
        </List>
    );
}

export default LocationItem;
