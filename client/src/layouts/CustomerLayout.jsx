import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const CustomerLayout = () => {
    return (
        <>
            <Outlet />
            <Navbar />
        </>
    )
}

export default CustomerLayout