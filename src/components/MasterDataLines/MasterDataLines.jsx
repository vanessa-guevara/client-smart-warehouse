import ListItemButton from '@mui/material/ListItemButton';
import { TextField } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import Autocomplete from '@mui/material/Autocomplete';
import './MasterDataLines.scss'
import { useEffect, useState } from 'react';

import axios from 'axios';

function MasterDataLines({itemWhs,setItemWhs}) {

    const token = sessionStorage.getItem("token");
    const [warehouses, setWarehouses] = useState([]);
    const [locations, setLocations] = useState([]);
    const URL =process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchWarehouses = async () => {

            try {

                const response = await axios.get(`${URL}/warehouses/locations`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
                );
                const whs = response.data
                setWarehouses(whs);

                //location per warehouse
                const responseLocation = await axios.get(`${URL}/locations`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setLocations(responseLocation.data)




            }
            catch (error) {
                console.error("Error getting warehouse:", error);
            }

        };

        fetchWarehouses();
    }, []);

    function handledChange(warehouseID, newValue) {
        setItemWhs(prevItemWh => {
           
            if (newValue === null) {
                return prevItemWh.filter(item => item.WarehouseID !== warehouseID);
            }
    
           
            const filteredItemWh = prevItemWh.filter(item => item.WarehouseID !== warehouseID);
            return [...filteredItemWh, { WarehouseID: warehouseID, locationDefaultID: newValue.LocationID }];
        });
    }
    


    

    return (
        <div className='item-wh'>
            <div className='item-wh__titles'>
                <div className='item-wh__label'>
                    <ListItemText primary="Whs Code" />
                </div>
                <div className='item-wh__label'>
                    <ListItemText primary="Name" />
                </div>
                <div className='item-wh__label'>
                    <ListItemText primary="Default Location" />
                </div>
            </div>


            {warehouses.map((wh) => {
                return (
                    <div className='item-wh__detail'>
                        <ListItemButton component="a" href="#simple-list">

                            <div className='item-wh__label'>
                                <ListItemText primary={wh.WarehouseID} />
                            </div>
                            <div className='item-wh__label'>
                                <ListItemText primary={wh.WarehouseName} />
                            </div>
                            <div className='item-wh__label'>

                                <Autocomplete
                                    disablePortal
                                    id="combo-box-groups"
                                    options={locations.filter(location => location.WarehouseID === wh.WarehouseID)}
                                    getOptionLabel={(location) => location.LocationCode}
                                    onChange={(event, newValue) => {
                                        handledChange(wh.WarehouseID, newValue);
                                    }}

                                    sx={{ width: '100%' }}
                                    renderInput={(params) => <TextField {...params}
                                   
                                     />}
                                />
                               
                            </div>

                        </ListItemButton>
                    </div>)
            })}


        </div>
    )
}

export default MasterDataLines;
