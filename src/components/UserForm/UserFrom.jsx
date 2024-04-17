import React, { useState } from 'react';
import Input from "../Input/Input";
import Left from '../Left/Left';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import { TextField, Autocomplete } from "@mui/material";
import './UserForm.scss';
import Button from "../Button/Button";
import axios from 'axios';

function UserForm() {
    const [username, setUsername] = useState('');
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [selectedRole, setSelectedRole] = useState(null); 
    const [message, setMessage] = useState('');
    const [alertType, setAlertType] = useState('success'); 
    const URL =process.env.REACT_APP_API_URL;
    const navigate = useNavigate();

    const roles = [
        { "id": "1", "role": 'Warehouse Operator' },
        { "id": "2", "role": 'System Administrator' },
        { "id": "3", "role": 'Logistic' }
    ];

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${URL}/user/signup`, {
                User: user,
                Password: password,
                Username: username,
                Role: selectedRole?.role 
            });

            setMessage(response.data.message);
            setAlertType('success');
            setUsername('');
            setUser('');
            setPassword('');
            setSelectedRole(null);
        } catch (error) {
            setMessage(error.response?.data?.message || error.message);
            setAlertType('error');
        }
    };

    return (
        <section className="users">
            
            <div className='users__header'>
            <Left/>
            <h2 className="users__titles">New User</h2>
            </div>
            <form className="users__form" onSubmit={handleSubmit}>
                <Input label="User" value={user} onChange={e => setUser(e.target.value)} required />
                <Input label="User Name" value={username} onChange={e => setUsername(e.target.value)} required />
                <Input type="password" label="Password" value={password} onChange={e => setPassword(e.target.value)} required />
                <Autocomplete
                    disablePortal
                    id="combo-box-role"
                    options={roles}
                    getOptionLabel={option => option.role}
                    value={selectedRole}
                    onChange={(event, newValue) => setSelectedRole(newValue)}
                    renderInput={params => <TextField {...params} label="Role" />}
                    sx={{ width: '100%' }}
                />
                <Button type="submit" variant="contained" text="Add" />
            </form>
            {message && (
                <Alert severity={alertType}>
                    {message}
                </Alert>
            )}
        </section>
    );
}

export default UserForm;
