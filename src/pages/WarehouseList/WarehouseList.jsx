
import List from '@mui/material/List';
import add from '../../assets/icons/add.png';
import remove from '../../assets/icons/delete.png'
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Input from '../../components/Input/Input';
import ImageIcon from '@mui/icons-material/Image';
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import axios from 'axios';

import { useState, useEffect } from 'react';

import Left from '../../components/Left/Left';
import { useNavigate } from 'react-router-dom';
const style = {
    py: 0,
    width: '100%',
    borderRadius: 2,
    border: '1px solid',
    borderColor: 'divider',
    backgroundColor: 'background.paper',
    margin: '3rem'
};



function WarehouseList() {
    const [warehouse, setwarehouse] = useState([]);
    const [listwarehouse, setListwarehouse] = useState([]);
    const token = sessionStorage.getItem("token");

    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchError, setSearchError] = useState(false);


    const URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchwarehouse = async () => {

            try {

                const response = await axios.get(`${URL}/warehouses`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
                );
                const warehouse = response.data;
                setwarehouse(warehouse);
                setListwarehouse(warehouse);


            }
            catch (error) {
                console.error("Error getting warehouse:", error);
            }

        };

        fetchwarehouse();
    }, []);

    const handleClick = (id) => navigate(`/warehouse-list/edit/${id}`);

    function handleSearchChange(event) {
        setSearchTerm(event.target.value);

        if (event.target.value === '') {
            setwarehouse(listwarehouse)
            setSearchError(false);
        }
    }

    function handleSearch() {
        if (!searchTerm) {
            setSearchError(true);
            return;
        }

        const searchResults = listwarehouse.filter((warehouse) =>
            warehouse.WarehouseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            warehouse.WarehouseID.toString() === searchTerm
        );

        setwarehouse(searchResults);
        setSearchError(false);
    }


    return (
        <div className='inventory'>

            <div className='order__header'>
                <div className='order__titles'>
                    <Left />
                    <h2 >Warehouses List</h2>
                    <Link to='/warehouse'>
                        <img className='inventory__edit' src={add} alt="sdd" />
                    </Link>
                </div>

                <div className='order__titles1'>
                    <Input label="Warehouse #"
                        onChange={handleSearchChange}
                        value={searchTerm}
                        helperText={searchError ? "Input warehouse id or name" : ""}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSearch();
                                e.preventDefault();
                            }
                        }} />

                    <Button variant="contained"
                        onClick={handleSearch}
                        type="button"
                        text="Search" />

                </div>
            </div>

            
            <ul className='inventory__list'>
            <div className='inventory__labels'>
                <div className='inventory__info1'>
            <ListItemText primary="Warehouse Name"
                
            />
            </div>
            <div className='inventory__group1'>
            <ListItemText primary="Warehouse Info"

            />
            </div>
            </div>
                {warehouse.map((wh) => {
                    return (

                        <ListItemButton onClick={() => handleClick(wh.WarehouseID)}>
                            <div className='inventory__item'>

                                <ListItemAvatar>
                                    <Avatar>
                                        <ImageIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <div className='inventory__container'>
                                    <div className='inventory__info'>
                                        <ListItemText primary={wh.WarehouseID + "-" + wh.WarehouseName}
                                            secondary={'Manager:' + (wh.Username === null ? 'N/A' : wh.Username)}
                                        />

                                    </div>
                                    <div className='inventory__group'>

                                        <ListItemText

                                            secondary={
                                                <div>
                                                    <span>Address: {wh.Address}</span><br />
                                                    <span>City: {wh.City}</span><br />
                                                    <span>Country: {wh.Country}</span>
                                                </div>
                                            }
                                        />

                                    </div>
                                    {/* <div className='inventory__delete'>
                                        <img className='inventory__delete-icon' src={remove} alt="delete" />
                                    </div> */}
                                </div>
                            </div>

                        </ListItemButton>

                    )


                })}


            </ul>
        </div>
    );
}
export default WarehouseList