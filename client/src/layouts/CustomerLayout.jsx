import { Outlet,useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useEffect } from 'react';

const CustomerLayout = () => {

    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        if(token === null) {
            navigate('/login');
        }
    },[])

    return (
        <div className="h-screen">
            <Outlet />
            <Navbar />
        </div>
    )
}

export default CustomerLayout