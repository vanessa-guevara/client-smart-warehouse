
import warehouse from '../../assets/icons/warehouse.png'
import transport from '../../assets/icons/transport.png'
import menu from '../../assets/icons/menu.png'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


function MenuManager() {
    const navigate =useNavigate();

    return (
        <div className="menu">
          
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
export default MenuManager;