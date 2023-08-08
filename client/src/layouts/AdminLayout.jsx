import { useEffect } from 'react';
import { useNavigate,Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import AdminNavbar from '../components/AdminNavbar';

const AdminLayout = () => {

    const navigate = useNavigate();
    const token = localStorage.getItem('adminToken');

    useEffect(() => {
        if(token === null) {
            navigate('/login');
        }
    },[])

    return (
        <div className="h-screen flex">
            <Sidebar />
            <div className="w-full">
                <AdminNavbar />
                <Outlet />
            </div>
        </div>
    )
}

export default AdminLayout;