import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const CustomerLayout = () => {
    return (
        <div className="h-screen">
            <Outlet />
            <Navbar />
        </div>
    )
}

export default CustomerLayout