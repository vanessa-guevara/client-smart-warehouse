
import delivery from '../../assets/icons/delivery.png'
import purchase from '../../assets/icons/purchase.png'
import purchaseOrder from '../../assets/icons/PurchaseOrder.png'
import saleOrder from '../../assets/icons/saleOrder.png'
import inventory from '../../assets/icons/inventory.png'
import reports from '../../assets/icons/reports.png'


import './Menu.scss'
import { useNavigate } from 'react-router-dom';


function Menu() {
   
    const navigate=useNavigate();

    return (
        <div className="menu">
          
           
                <div className="menu__card"  onClick={() => navigate('/item-list')}>
                    <img className="menu__img" src={inventory} alt="place" />
                    <h2 className='menu__title'>Items</h2>
                </div>
           
          
                <div className="menu__card" onClick={() => navigate('/delivery')}>
                    <img className="menu__img" src={delivery} alt="place" />
                    <h2 className='menu__title'>Delivery</h2>
                </div>
          
           
                <div className="menu__card" onClick={() => navigate('/sales-orders')}>
                    <img className="menu__img" src={saleOrder} alt="place" />
                    <h2 className='menu__title'>Sales Orders</h2>
                </div>
           


           
                <div className="menu__card" onClick={() => navigate('/good-receipt')}>
                    <img className="menu__img" src={purchase} alt="place" />
                    <h2 className='menu__title'>Good Receipts</h2>
                </div>
           
           
                <div className="menu__card" onClick={() => navigate('/purchase-orders')}>
                    <img className="menu__img" src={purchaseOrder} alt="place" />
                    <h2 className='menu__title'>Purchase Orders</h2>
                </div>
         
           
                <div className="menu__card" onClick={() => navigate('/reports')}>
                    <img className="menu__img" src={reports} alt="place" />
                    <h2 className='menu__title'>Reports</h2>
                </div>
           
        </div>
    )
}
export default Menu;