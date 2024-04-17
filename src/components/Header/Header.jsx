import { Link, useNavigate } from 'react-router-dom';
import logout from '../../assets/icons/logout.png'
import logo from '../../assets/logo/logo.png'
import user from '../../assets/icons/user.png'
import { useEffect,useState } from 'react';
import './Header.scss'

function Header() {
    const role = sessionStorage.getItem("role");
    const userName =sessionStorage.getItem("user");
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
    const navigate = useNavigate();
    //updating time every one second
    useEffect(() => {
        const timerId = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString());
        }, 1000);
        

        return () => clearInterval(timerId);
    }, []);

    function handledLogout(){
        sessionStorage.clear();
        navigate('/')
    }

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
        <div className='header'>
           
                <div className='header__container' onClick={redirect}>
                    <img src={logo} alt="logo"
                        className='header__logo' />
                </div>
           
            <div className='header__right'>
                <div className='header__userinfo'>
                    <h4 className='header__info'>Hi! {userName} </h4>
                    <p>{currentTime}</p>
                </div>
                <Link to='/welcome'>
                    <img className='header__user' src={user} alt="user" />
                </Link>
                <img   className='header__logout' src={logout} alt="logout" onClick={handledLogout} />
                



            </div>
        </div>
    )
}

export default Header;