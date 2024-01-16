import { BsPersonCircle,BsFillBellFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../baseUrl';
import { fetchApiHook } from '../hooks/fetchApiHook';
import { Link } from 'react-router-dom';
import { CiMenuBurger } from 'react-icons/ci';
import { IoIosLogOut } from "react-icons/io";
import { useState,useEffect } from 'react'

const AdminNavbar = ({ setShowSidebar,showSidebar }) => {

    const userName = localStorage.getItem('admin');
    const navigate = useNavigate();

    const { records: users } = fetchApiHook(`${baseUrl()}/users`);
    const lastRegistered = users[users?.length - 1];

    const { records: feedbacks } = fetchApiHook(`${baseUrl()}/feedbacks`);

    const [notifications,setNotifications] = useState([]);

    useEffect(() => {
        const createNotificationLists = () => {
            if(!lastRegistered?.isApproved) {
                setNotifications(lastRegistered);
            }

            if(!feedbacks?.isRead) {
                setNotifications(feedbacks);
            }
        }
        createNotificationLists();
    },[])


    const handleLogout = () => {
        localStorage.removeItem('admin');
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminId');
        navigate('/admin/login');
    }

    return (
        <nav className="flex justify-between items-center p-3 px-10 bg-green-500 text-gray-700">
            <div className="flex gap-5 items-center">
                <button onClick={() => setShowSidebar(!showSidebar)} className="font-bold md:hidden block"><CiMenuBurger /></button>
                <img className="w-10 h-10" src="/images/WiseTruck_Logo.png" alt="wisetruck logo" />
                <h1 className="text-xl font-semibold">{userName}</h1>
            </div>
            <div className="flex items-center gap-4">
                {/* <button onClick={handleLogout}><BsPersonCircle /></button> */}
                <BsFillBellFill />
                {/* { lastRegistered?.isApproved ? <BsFillBellFill /> : 
                <div className="relative">
                    <BsFillBellFill />
                    <p className="bg-red-500 absolute flex items-center justify-center -right-2 text-gray-100 text-xs rounded-full w-4 h-4">1</p> 
                </div>
                } */}

                { console.log(notifications) }

                <button onClick={handleLogout}><IoIosLogOut /></button>
                
            </div>
        </nav>
    )
}

export default AdminNavbar;