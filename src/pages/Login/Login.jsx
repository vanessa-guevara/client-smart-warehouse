
import { Button, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Logo from '../../components/Logo/Logo';
import axios from 'axios';
        
import './Login.scss'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
   
function Login() {
    const URL =process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [validation, setValidation] = useState(true);

   
    const handleSubmit = async (event) => {
      event.preventDefault();
      console.log(`${URL}/user/login`)
      try {
        const response = await axios.post(`${URL}/user/login`, {
          User: username,
          Password: password,
        });
        sessionStorage.setItem('token', response.data.token);
        sessionStorage.setItem('user', response.data.username); 
        sessionStorage.setItem('role', response.data.role); 
        console.log('Login successful:', response.data);
        setValidation(true)

        navigate('/welcome')


      } catch (error) {
        console.error('Login failed:', error.response?.data?.message || error.message);
        setValidation(false)
      }
    };

    return (

        <div className='login'>
            <div className='login__logo'>

                <Logo />
            </div>
            <div className='login__right'>



                <FormControl className='login__form' component="form" onSubmit={handleSubmit} sx={{ margin: '4rem',display:'flex' }}>
                    <TextField
                        label="Username"
                        variant="outlined"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Button type="submit" variant="contained" color="primary" sx={{position:'unset'}}>
                        Log In
                    </Button>

                    {!validation&&<p className='error'>Incorrect username or password! </p>}
                </FormControl>

            </div>

        </div>

    )
}

export default Login