import { Link } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';

const Sidebar = ({ showSidebar,setShowSidebar }) => {

    const path = window.location.pathname;
    const viewHeight = window.outerHeight;
    return (
        <nav style={{ height: viewHeight }} className={`bg-gray-700 text-gray-200 p-4 h-full md:block md:w-full col-span-1 ${ showSidebar ? 'block fixed z-50' : 'hidden' }`}>
            <div className="flex justify-between items-center">
                <h1 className="font-semibold">General</h1>
                <button className="md:hidden block" onClick={() => setShowSidebar(false)}><AiOutlineClose /></button>
            </div>
            <ul className="mt-10 flex flex-col gap-4">
                <Link className={`${path === '/admin' ? "bg-gray-800 text-green-500" : ''} p-2 hover:bg-gray-800 transition rounded-md`} to='/admin'><li>Dashboard</li></Link>
                <Link className={`${path === '/admin/collection' ? "bg-gray-800 text-green-500" : ''} p-2 hover:bg-gray-800 transition rounded-md`} to='/admin/collection'><li>Collection Records</li></Link>
                <Link className={`${path === '/admin/waste' ? "bg-gray-800 text-green-500" : ''} p-2 hover:bg-gray-800 transition rounded-md`} to='/admin/waste'><li>Waste Types</li></Link>
                <Link className={`${path === '/admin/schedule' ? "bg-gray-800 text-green-500" : ''} p-2 hover:bg-gray-800 transition rounded-md`} to='/admin/schedule'><li>Generate Schedules</li></Link>
                <Link className={`${path === '/admin/news' ? "bg-gray-800 text-green-500" : ''} p-2 hover:bg-gray-800 transition rounded-md`} to='/admin/news'><li>News and Updates</li></Link>
                <Link className={`${path === '/admin/collector' ? "bg-gray-800 text-green-500" : ''} p-2 hover:bg-gray-800 transition rounded-md`} to='/admin/collector'><li>Collector Accounts</li></Link>
                <Link className={`${path === '/admin/users' ? "bg-gray-800 text-green-500" : ''} p-2 hover:bg-gray-800 transition rounded-md`} to='/admin/users'><li>User Accounts</li></Link>
                <Link className={`${path === '/admin/create' ? "bg-gray-800 text-green-500" : ''} p-2 hover:bg-gray-800 transition rounded-md`} to='/admin/create'><li>Add Admin</li></Link>
                <Link className={`${path === '/admin/feedbacks' ? "bg-gray-800 text-green-500" : ''} p-2 hover:bg-gray-800 transition rounded-md`} to='/admin/feedbacks'><li>Feedbacks</li></Link>
            </ul>
        </nav>
    )
}

export default Sidebar;