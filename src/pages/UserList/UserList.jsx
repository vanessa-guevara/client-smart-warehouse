
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



function UserList() {
    const [users, setusers] = useState([]);
    const [listusers, setListusers] = useState([]);
    const token = sessionStorage.getItem("token");

    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchError, setSearchError] = useState(false);


    const URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchusers = async () => {

            try {

                const response = await axios.get(`${URL}/user`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
                );
                const users = response.data;
                setusers(users);
                setListusers(users);


            }
            catch (error) {
                console.error("Error getting users:", error);
            }

        };

        fetchusers();
    }, []);

    const handleClick = (id) => navigate(`/user-list/edit/${id}`);

    function handleSearchChange(event) {
        setSearchTerm(event.target.value);

        if (event.target.value === '') {
            setusers(listusers)
            setSearchError(false);
        }
    }

    function handleSearch() {
        if (!searchTerm) {
            setSearchError(true);
            return;
        }

        const searchResults = listusers.filter((user) =>
            user.Username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.User.toString() === searchTerm
        );

        setusers(searchResults);
        setSearchError(false);
    }

    console.log(users)
    return (
        <div className='inventory'>

            <div className='order__header'>
                <div className='order__titles'>
                    <Left />
                    <h2 >User List</h2>
                    <Link to='/users'>
                        <img className='inventory__edit' src={add} alt="sdd" />
                    </Link>
                </div>

                <div className='order__titles1'>
                    <Input label="user #"
                        onChange={handleSearchChange}
                        value={searchTerm}
                        helperText={searchError ? "Input user id or name" : ""}
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
                    <div className='inventory__info'>
                        <ListItemText primary="Name" sx={{'margin-left':'1rem'}}

                        />
                    </div>
                    <div className='inventory__info'>
                        <ListItemText primary="User"

                        />
                    </div>
                    <div className='inventory__info'>
                        <ListItemText primary="Role"

                        />
                    </div>

                </div>
                {users.map((user) => {
                    return (

                        <ListItemButton>
                            <div className='inventory__item'>

                                <div className='inventory__container'>
                                    <div className='inventory__info'>
                                    <ListItemText primary={user.Username} />
                                       
                                    </div>
                                    <div className='inventory__info'>
                                    <ListItemText primary={user.User}/>
                                    </div>
                                    <div className='inventory__group'>
                                        <ListItemText primary={user.Role} />
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
export default UserList