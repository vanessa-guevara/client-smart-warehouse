import PopularItems from "../../components/PopularItems/PopularItems";
import { useState, useEffect } from "react";
import Left from "../../components/Left/Left";
import axios from "axios";
import './Reports.scss'

function Reports() {
    const token = sessionStorage.getItem("token");
    const [popularDeliveryItems, setPopularDeliveryItems] = useState([]);
    const [popularPurchaseItems, setPopularPurchaseItems] = useState([]);
    const URL = process.env.REACT_APP_API_URL;
    useEffect(() => {
        async function fetchItems() {
            try {
                const [deliveryResponse, purchaseResponse] = await Promise.all([
                    axios.get(`${URL}/inventoryTransaction/delivery`, {
                        headers: { Authorization: `Bearer ${token}` }
                    }),
                    axios.get(`${URL}/inventoryTransaction/purchase`, {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                ]);

                processItems(deliveryResponse.data, setPopularDeliveryItems);
                processItems(purchaseResponse.data, setPopularPurchaseItems);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        }

        fetchItems();
    }, [token]);

    function processItems(data, setItems) {
        const itemCounts = data.reduce((acc, item) => {
            acc[item.ItemName] = (acc[item.ItemName] || 0) + item.Quantity;
            return acc;
        }, {});

        const itemsArray = Object.keys(itemCounts).map(key => ({
            name: key,
            quantity: itemCounts[key],
        }));

        itemsArray.sort((a, b) => b.quantity - a.quantity);
        setItems(itemsArray);
    }

    return (
        <div className="reports">
            <div className='order__titles'>
                <Left />
                <h2>Reports</h2>
            </div>

            <div className="reports__charts">
            <div className="reports__container">

                <h3 className="reports__titles">Popular Delivery Items</h3>
                <PopularItems data={popularDeliveryItems} type={"Delivered"} />
            </div>
            <div className="reports__container">
                <h3 className="reports__titles">Popular Purchase Items</h3>
                <PopularItems data={popularPurchaseItems} type={"Received"} />
            </div>
            </div>
        </div>
    )
}

export default Reports;
