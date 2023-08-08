import { BsPersonCircle,BsFillBellFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const AdminNavbar = () => {

    const userName = localStorage.getItem('admin');
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('admin');
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminId');
        navigate('/admin/login');
    }

    return (
        <nav className="flex justify-between items-center p-3 px-10 bg-green-200 text-gray-700">
            <h1 className="text-xl font-semibold">{userName}</h1>
            <div className="flex items-center gap-4">
                <button onClick={handleLogout}><BsPersonCircle /></button>
                <button><BsFillBellFill /></button>
            </div>
        </nav>
    )
}

export default AdminNavbar;