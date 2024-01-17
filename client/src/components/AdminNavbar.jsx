import { BsPersonCircle,BsFillBellFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../baseUrl';
import { fetchApiHook } from '../hooks/fetchApiHook';
import { Link } from 'react-router-dom';
import { CiMenuBurger } from 'react-icons/ci';
import { IoIosLogOut } from "react-icons/io";
import { useState,useEffect } from 'react'
import axios from 'axios';

const AdminNavbar = ({ setShowSidebar,showSidebar }) => {

    const userName = localStorage.getItem('admin');
    const navigate = useNavigate();

    const { records: users } = fetchApiHook(`${baseUrl()}/users`);
    const lastRegistered = users[users?.length - 1];

    const { records: feedbacks } = fetchApiHook(`${baseUrl()}/feedbacks`);
    
    const notReadCount = feedbacks?.filter(feedback => !feedback.isRead).length;
    const newUserCount = users?.filter(user => !user.isApproved).length;

    const totalNumberOfNotif = notReadCount + newUserCount;

    const [showNotif,setShowNotif] = useState(false);

    const markFeedbackAsRead = async () => {
        window.location.reload();
        try {
            const data = await axios.get(`${baseUrl()}/feedbacks/markasread`);
            console.log('data has been read');
        } catch(err) {
            console.log(err);
        }
    }

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

                <div className="relative flex flex-col">
                    { totalNumberOfNotif > 0 ? <button onClick={() => setShowNotif(!showNotif)}><BsFillBellFill /></button> : <BsFillBellFill /> }
                    {!showNotif && totalNumberOfNotif > 0 && <p className="absolute text-xs top-3 z-50 bg-red-500 text-white w-4 h-4 rounded-full flex items-center justify-center left-2">{totalNumberOfNotif}</p>}

                    {/* Show items to be clicked under here */}
                    { showNotif &&
                        <div className="bg-white border border-gray-300 rounded-md w-44 p-2 absolute top-5 -left-32 z-50 flex flex-col gap-2">
                            { notReadCount > 0 && 
                            <p onClick={markFeedbackAsRead} className="text-xs bg-gray-100 p-2 cursor-pointer border border-gray-300"><Link to='/admin/feedbacks'>There are unread feedbacks, please check</Link></p>
                            }

                            { newUserCount > 0 && 
                            <p className="text-xs bg-gray-100 p-2 cursor-pointer border border-gray-300"><Link to='/admin/users'>There are new users, please check</Link></p>
                            }
                        </div>
                    }
                </div>

                {/* { lastRegistered?.isApproved ? <BsFillBellFill /> : 
                <div className="relative">
                    <BsFillBellFill />
                    <p className="bg-red-500 absolute flex items-center justify-center -right-2 text-gray-100 text-xs rounded-full w-4 h-4">1</p> 
                </div>
                } */}
                <button onClick={handleLogout}><IoIosLogOut /></button>
                
            </div>
        </nav>
    )
}

export default AdminNavbar;