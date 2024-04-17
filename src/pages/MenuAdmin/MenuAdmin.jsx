
import users from '../../assets/icons/users.png'
import warehouse from '../../assets/icons/warehouse.png'
import menu from '../../assets/icons/menu.png'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


function MenuAdmin() {
    const navigate =useNavigate();

    return (
        <div className="menu">
          
            <Link to='/users'>
                <div className="menu__card" >
                    <img className="menu__img" src={users} alt="place" />
                    <h1 className='menu__title'>Users</h1>
                </div>
            </Link>
            <Link to='/warehouse-list'>
                <div className="menu__card" >
                    <img className="menu__img" src={warehouse} alt="place" />
                    <h1 className='menu__title'>Warehouses</h1>
                </div>
            </Link>
           
                <div className="menu__card" onClick={() => navigate('/menu')}>
                    <img className="menu__img" src={menu} alt="place" />
                    <h1 className='menu__title'>Menu</h1>
                </div>
           

        </div>
    )
}
export default MenuAdmin;