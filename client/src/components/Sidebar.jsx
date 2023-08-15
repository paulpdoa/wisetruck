import { Link } from 'react-router-dom';

const Sidebar = () => {

    
    const path = window.location.pathname;

    return (
        <nav className="bg-gray-700 text-gray-200 p-4 h-screen w-1/4 hidden md:block">
            <h1 className="font-semibold">General</h1>

            <ul className="mt-10 flex flex-col gap-4">
                <Link className={`${path === '/admin' ? "bg-gray-800 text-green-500" : ''} p-2 hover:bg-gray-800 transition rounded-md`} to='/admin'><li>Dashboard</li></Link>
                <Link className={`${path === '/admin/collection' ? "bg-gray-800 text-green-500" : ''} p-2 hover:bg-gray-800 transition rounded-md`} to='/admin/collection'><li>Collection Records</li></Link>
                <Link className={`${path === '/admin/waste' ? "bg-gray-800 text-green-500" : ''} p-2 hover:bg-gray-800 transition rounded-md`} to='/admin/waste'><li>Waste Types</li></Link>
                <Link className={`${path === '/admin/schedule' ? "bg-gray-800 text-green-500" : ''} p-2 hover:bg-gray-800 transition rounded-md`} to='/admin/schedule'><li>Generate Schedules</li></Link>
                <Link className={`${path === '/admin/news' ? "bg-gray-800 text-green-500" : ''} p-2 hover:bg-gray-800 transition rounded-md`} to='/admin/news'><li>News and Updates</li></Link>
                <Link className={`${path === '/admin/users' ? "bg-gray-800 text-green-500" : ''} p-2 hover:bg-gray-800 transition rounded-md`} to='/admin/users'><li>User Accounts</li></Link>
                <Link className={`${path === '/admin/feedbacks' ? "bg-gray-800 text-green-500" : ''} p-2 hover:bg-gray-800 transition rounded-md`} to='/admin/feedbacks'><li>Feedbacks</li></Link>
            </ul>
        </nav>
    )
}

export default Sidebar;