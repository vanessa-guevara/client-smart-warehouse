
import './Welcome.scss'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function Welcome() {
    const role = sessionStorage.getItem("role");
    const URLAPI = 'https://api.api-ninjas.com/v1/randomimage?category=nature'
    const [images, setImage] = useState();
    const [quotation, setQuotation] = useState();
    const navigate = useNavigate();
    const key = 'Kp1Fsibeh0P6yeHAJvvRVg==HnTQKrH4fQaZLWy6'
    const parameters = {
        category: 'nature'
    };

    const headers = {
        'X-Api-Key': key,
        'Accept': 'image/jpg'
    };

    // style image like background
    const background = {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.5)), url(${images})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: 'auto',
        width: '100vw',
    }

    const apiKey = 'Kp1Fsibeh0P6yeHAJvvRVg==HnTQKrH4fQaZLWy6';
    const url = `https://api.api-ninjas.com/v1/quotes`;


    useEffect(() => {
        const fetchWallpaper = async () => {

            try {
                //background
                const response = await axios.get(URLAPI, { params: parameters, responseType: 'blob', headers: headers });
                const imageBlob = response.data;
                const imageObjectURL = URL.createObjectURL(imageBlob);
                setImage(imageObjectURL);
                //qutation

                const responseQ = await axios.get(url, {
                    headers: {
                        'X-Api-Key': apiKey
                    },
                });



                setQuotation(responseQ.data[0]);
                console.log(responseQ.data[0])




            }
            catch (error) {
                console.error("Error getting quotation or images:", error);
            }

        };

        fetchWallpaper();
    }, []);

    function redirect(){
        if(role=='WarehouseOperator'||role=='Administrator'){
            navigate('/menu-admin')
        }
        else if (role==='Warehouse Manager')
        {
            navigate('/menu-manager')
        }
        else{
            navigate('/menu')
        }
        
    }


    return (
        <div className='welcome'>
            <div >
                <div className='welcome__image' style={background}>
                    <div className='welcome__container'>
                        <div className='welcome__style'>
                        <h3>{quotation?.quote}</h3>
                        <h4>{quotation?.author}</h4>
                        <div className='welcome__button'>
                        <br/>
                            <Button variant="contained" color="primary" sx={{ position: 'unset' }}
                                onClick={redirect}>Menu</Button>
                        </div>
                        </div>
                    </div>

                </div>

            </div>



        </div>
    )
}
export default Welcome;