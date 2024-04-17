import React, { useState, useEffect } from 'react';
import Input from "../Input/Input";
import Left from '../Left/Left';
import Alert from '@mui/material/Alert';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Autocomplete } from "@mui/material";
import Button from "../Button/Button";
import axios from 'axios';

function WarehouseForm({ type }) {

    const params = useParams()
    const [listUsers, setListUsers] = useState([]);
    const [warehouseName, setWarehouseName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [message, setMessage] = useState('');
    const [alertType, setAlertType] = useState('success');
    const [editable, setEditable] = useState(type !== 'edit');
    const URL = process.env.REACT_APP_API_URL;
    const token = sessionStorage.getItem("token");
    const navigate = useNavigate();


    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await axios.get(`${URL}/user`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setListUsers(response.data);
            } catch (error) {
                console.error("Error getting users:", error);
            }
        }
        fetchUsers();

        if (type === 'edit' && params.id) {
            loadWarehouseData();
        }
    }, []);

    const loadWarehouseData = async () => {
        try {
            const response = await axios.get(`${URL}/warehouses/${params.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log(response.data)
            const { WarehouseName, Address, City, Country, UserID, Username } = response.data[0];
            setWarehouseName(WarehouseName);
            setAddress(Address);
            setCity(City);
            setCountry(Country);
            setSelectedUser({ UserID: UserID, Username: Username });
        } catch (error) {
            setMessage('Failed to load warehouse data.');
            setAlertType('error');
            console.error("Error loading warehouse data:", error);
        }
    };

    console.log(selectedUser)

    const enableEdit = () => {
        setEditable(true);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            if (type === 'edit') {
                const response = await axios.put(`${URL}/warehouses/${params.id}`, {
                    warehouseName,
                    Address: address,
                    City: city,
                    Country: country,
                    UserID: selectedUser?.UserID
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
    
                setMessage('Warehouse updated successfully.');
            } else {
                const response = await axios.post(`${URL}/warehouses`, {
                    warehouseName,
                    Address: address,
                    City: city,
                    Country: country,
                    UserID: selectedUser?.UserID
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
    
                setMessage('Warehouse added successfully.');
            }
    
            setAlertType('success');
        } catch (error) {
            setMessage(error.response?.data?.message || error.message);
            setAlertType('error');
        }
    };
    

    return (
        <section className="users">
            {message && <Alert severity={alertType}>{message}</Alert>}
            <div className='users__header'>
                <Left />
                <h2 className="users__titles">{type === 'edit' ? 'Edit Warehouse' : 'New Warehouse'}</h2>
            </div>
            <form className="users__form" onSubmit={handleSubmit}>
                <Input label="Warehouse Name"
                    value={warehouseName}
                    onChange={e => setWarehouseName(e.target.value)}
                    required disabled={!editable} />
                <Input label="Address" value={address}
                    onChange={e => setAddress(e.target.value)}
                    required disabled={!editable} />
                <Input label="City" value={city}
                    onChange={e => setCity(e.target.value)}
                    required disabled={!editable} />
                <Input label="Country" value={country}
                    onChange={e => setCountry(e.target.value)}
                    required
                    disabled={!editable} />
                <Autocomplete
                    disablePortal
                    id="combo-box-user"
                    options={listUsers}
                    getOptionLabel={(option) => option.Username !== undefined && option.Username !== null ? option.Username : 'No user selected'}
                    value={type === 'edit' ? selectedUser : selectedUser?.UserID}
                    onChange={(event, newValue) => setSelectedUser(newValue)}
                    renderInput={(params) => <TextField {...params} label="User" />}
                    disabled={!editable}
                    sx={{ width: '100%' }}
                />



                {type === 'edit' && !editable && <Button onClick={enableEdit} variant="contained" text="Edit" />}
                {editable&&<Button type="submit" variant="contained" text={type === 'edit' ? 'Update' : 'Add'} />}
            </form>
        </section>
    );
}

export default WarehouseForm;
