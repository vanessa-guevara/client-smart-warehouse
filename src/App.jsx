import MasterData from "./pages/MasterData/MasterData";
import InventoryList from "./pages/InventoryList/InventoryList";
import LocationList from "./pages/LocationList/LocationList";
import Menu from "./pages/Menu/Menu";
import Login from "./pages/Login/Login";
import Header from "./components/Header/Header";
import OrderDetail from "./pages/SalesOrderDetail/SalesOrderDetail";
import Orders from "./pages/SalesOrders/SalesOrders";
import LayoutAuth from "./pages/LayoutAuth/LayoutAuth";
import Reports from './pages/Reports/Reports'
import './App.scss'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import OrderList from "./pages/OrdersList/OrderList";
import LocationItem from "./pages/LocationItem/LocationItem";
import Welcome from "./pages/Welcome/Welcome";
import ItemEdit from "./pages/ItemEdit/ItemEdit";
import MenuAdmin from "./pages/MenuAdmin/MenuAdmin";
import Users from "./pages/Users/Users";
import NotFound from "./pages/NotFound/NotFound";
import MenuManager from "./pages/MenuManager/MenuManager";
import WarehouseForm from "./components/WarehouseForm/WarehouseForm";
import WarehouseList from "./pages/WarehouseList/WarehouseList";
import WarehouseEdit from "./pages/WarehouseEdit/WarehouseEdit";
import UserList from "./pages/UserList/UserList";
function App() {
  return (

    <div className="App">

      <BrowserRouter>


        <Routes>
          <Route path="/" element={<Login />} />

          <Route element={<LayoutAuth />}>
          <Route path="/welcome" element={<Welcome />} />
            <Route path="/new-item" element={<MasterData />} />
            <Route path="/item-list" element={<InventoryList />} />
            <Route path="/user-list" element={<UserList />} />
            <Route path="/warehouse-list" element={<WarehouseList />} />
            <Route path="/location-list" element={<LocationList />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/menu-admin" element={<MenuAdmin />} />
            <Route path="/menu-manager" element={<MenuManager />} />
            <Route path="/delivery" element={<Orders type={"sales"} />} />
            <Route path="/delivery/sales-detail/:id" element={<OrderDetail type={"sales"} />} />
            <Route path="/good-receipt" element={<Orders type={"purchase"} />} />
            <Route path="/good-receipt/purchase-detail/:id" element={<OrderDetail type={"purchase"} />} />
            <Route path="/sales-orders/" element={<OrderList type={"sales"} />} />
            <Route path="/purchase-orders/" element={<OrderList type={"purchase"} />} />
            <Route path="/reports/" element={<Reports/>} />
            <Route path="/item-list/edit/:id" element={<ItemEdit />} />
            <Route path="/warehouse-list/edit/:id" element={<WarehouseEdit />} />
            <Route path="/users" element={<Users />} />
            <Route path="/warehouse" element={<WarehouseForm />} />
            <Route path="*" element={<NotFound />} />
            

          </Route>
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
