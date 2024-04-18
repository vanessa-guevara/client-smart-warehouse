
import List from '@mui/material/List';
import add from '../../assets/icons/add.png'
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
import './InventoryList.scss'
import Left from '../../components/Left/Left';
import { useNavigate } from 'react-router-dom';
const style = {
    py: 0,
    width: '100%',

    borderRadius: 2,
    border: '1px solid',
    borderColor: 'divider',
    backgroundColor: 'background.paper',
};



function InventoryList() {
    const [items, setItems] = useState([]);
    const [listItems, setListItems] = useState([]);
    const token = sessionStorage.getItem("token");

    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchError, setSearchError] = useState(false);
    

    const URL =process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchItems = async () => {

            try {

                const response = await axios.get(`${URL}/items`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
                );
                const items = response.data;
                setItems(items);
                setListItems(items);


            }
            catch (error) {
                console.error("Error getting items:", error);
            }

        };

        fetchItems();
    }, []);

    const handleClick = (id) => navigate(`/item-list/edit/${id}`);
    
    function handleSearchChange(event) {
        setSearchTerm(event.target.value);

        if (event.target.value === '') {
            setItems(listItems)
            setSearchError(false);
        }
    }

    function handleSearch() {
        if (!searchTerm) {
            setSearchError(true);
            return;
        }

        const searchResults = listItems.filter((item) =>
            item.ItemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.ItemID.toString() === searchTerm
        );

        setItems(searchResults);
        setSearchError(false);
    }


    return (
        <div className='inventory'>

            <div className='order__header'>
                <div className='order__titles'>
                    <Left />
                    <h2 >Item List</h2>
                    <Link to='/new-item'>
                        <img className='inventory__edit' src={add} alt="sdd" />
                    </Link>
                </div>

                <div className='order__titles1'>
                    <Input label="Item #"
                        onChange={handleSearchChange}
                        value={searchTerm}
                        helperText={searchError ? "Input item id or name" : ""}
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


            <ul className='inventory__list' sx={style}>
            <div className='inventory__labels'>
                <div className='inventory__info1'>
            <ListItemText primary="Item Name"
                sx={{'text-align':'justify'}}
            />
            </div>
            <div className='inventory__group'>
            <ListItemText primary="Group"

            />
            </div>
            </div>
                {items.map((item) => {
                    return (

                        <ListItemButton onClick={() => handleClick(item.ItemID)}>
                            <div className='inventory__item'>

                                <ListItemAvatar>
                                    <Avatar>
                                        <ImageIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <div className='inventory__container'>
                                    <div className='inventory__info'>
                                        <ListItemText primary={item.ItemID + "-" + item.ItemName + " " + item.Unit} secondary={"Stock:" + (item.TotalStock === null ? 0 : item.TotalStock)} />
                                    </div>
                                    <div className='inventory__group'>
                                        <ListItemText primary={item.GroupName} />
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
export default InventoryList