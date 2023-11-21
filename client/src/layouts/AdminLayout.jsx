import { useEffect,useState } from 'react';
import { useNavigate,Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import AdminNavbar from '../components/AdminNavbar';

const AdminLayout = () => {

    const navigate = useNavigate();
    const token = localStorage.getItem('adminToken');

    const [showSidebar,setShowSidebar] = useState(false);
    
    useEffect(() => {
        if(token === null) {
            navigate('/admin/login');
        }
    },[])

    return (
        <div className="grid grid-cols-5 relative">
            <Sidebar setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
            <div className="w-full md:col-span-4 col-span-5">
                <AdminNavbar setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
                <Outlet />
            </div>
        </div>
    )
}

export default AdminLayout;