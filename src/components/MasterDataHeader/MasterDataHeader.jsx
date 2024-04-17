import React, { useState, useEffect, useCallback } from 'react';
import { TextField, Autocomplete, Alert } from '@mui/material';
import Button from "../Button/Button";
import Left from '../Left/Left';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function MasterDataHeader({ type }) {
  const params = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState({
    ItemCode: '',
    ItemName: '',
    Unit: '',
    Weight: '',
    GroupCode: null
  });
  const [groups, setGroups] = useState([]);
  const [message, setMessage] = useState('');
  const [alertType, setAlertType] = useState('success');
  const [editable, setEditable] = useState(type !== 'edit');
  const URL = process.env.REACT_APP_API_URL;
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    async function fetchGroups() {
      try {
        const response = await axios.get(`${URL}/items/groups`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setGroups(response.data);
      } catch (error) {
        console.error("Error getting groups:", error);
      }
    }
    fetchGroups();

    if (type === 'edit' && params.id) {
      loadItemData();
    }
  }, [URL, token, type, params.id]); 

  const loadItemData = async () => {
    try {
      const response = await axios.get(`${URL}/items/${params.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const { ItemCode, ItemName, Unit, Weight, GroupCode } = response.data.item;
      setItem({ ItemCode, ItemName, Unit, Weight, GroupCode });
    } catch (error) {
      setMessage('Failed to load item data.');
      setAlertType('error');
    }
  };

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setItem(prevItem => ({
      ...prevItem,
      [name]: value
    }));
  }, []);

  const handleSubmit = async (event) => {
    console.log(item)
    event.preventDefault();
    //reuse same function diferent endpoint
    const endpoint = type === 'edit' ? `${URL}/items/${params.id}` : `${URL}/items`;
    const method = type === 'edit' ? axios.put : axios.post;

    console.log(endpoint)
    console.log(method)
    try {

      
      const response = await method(endpoint, item, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage(type === 'edit' ? 'Item updated successfully.' : 'Item added successfully.');
      setAlertType('success');


      setTimeout(() => {
        navigate('/item-list');
      }, 2000); 
      
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to update item.');
      setAlertType('error');
    }
  };

  return (
    <section className="users">
      {message && <Alert severity={alertType}>{message}</Alert>}
      <div className='users__header'>
        <Left />
        <h2 className="users__titles">{type === 'edit' ? 'Edit Item' : 'New Item'}</h2>
      </div>
      <form onSubmit={handleSubmit} className="users__form">
        <TextField label="Item Code" variant="outlined"
          name="ItemCode" value={item.ItemCode}
          onChange={handleChange} disabled={!editable} />
        <TextField label="Item Name" variant="outlined"
          name="ItemName" value={item.ItemName}
          onChange={handleChange} disabled={!editable} />
        <TextField label="Unit" variant="outlined"
          name="Unit" value={item.Unit}
          onChange={handleChange} disabled={!editable} />
        <TextField label="Weight" variant="outlined"
          name="Weight" value={item.Weight}
          onChange={handleChange} disabled={!editable} />
        <Autocomplete
          disablePortal id="combo-box-groups"
          options={groups}
          getOptionLabel={(option) => option.GroupName || ''}
          value={groups.find(g => g.GroupCode === item.GroupCode) || {}}
          onChange={(event, newValue) => {
            setItem(prevItem => ({
              ...prevItem,
              GroupCode: newValue ? newValue.GroupCode : null
            }));
          }}
          renderInput={(params) => <TextField {...params} label="Group" />}
          disabled={!editable}
        />
        {type === 'edit' && !editable && <Button onClick={() => setEditable(true)} variant="contained" text="Edit" />}
        {editable && <Button type="submit" variant="contained" text={type === 'edit' ? 'Update' : 'Add'} />}
      </form>
    </section>
  );
}

export default MasterDataHeader;
