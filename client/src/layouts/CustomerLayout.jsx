import { Outlet,useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useEffect } from 'react';

const CustomerLayout = () => {

    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        if(token === '') {
            navigate('/login');
        } else {
            navigate('/');
        }
    },[])

    return (
        <div className="h-full">
            <div className="h-screen bg-green-50">
                <Outlet />
                <Navbar />
            </div>
        </div>
    )
}

export default CustomerLayout