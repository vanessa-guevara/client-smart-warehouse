import Header from "../../components/Header/Header"
import { Outlet } from 'react-router-dom';
function LayoutAuth() {

    return (
        <>
            <Header />
            <Outlet />
        </>)
}
export default LayoutAuth