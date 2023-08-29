import { Link } from 'react-router-dom';

import { FcHome,FcNews } from 'react-icons/fc';
import { FaRecycle,FaLightbulb } from 'react-icons/fa';
import { BsPersonCircle } from 'react-icons/bs';

const Navbar = () => {

    const customerId = localStorage.getItem('customerId');

    return (
        <nav className="fixed bottom-0 w-full border-t-gray-900 border p-4 text-4xl bg-white z-50">
            <ul className="flex justify-around items-center">
                <li><Link to='/'><img className="w-8 h-8" src="/images/home-icon.png" alt="Home Icon" /></Link></li>
                <li><Link to='/news'><img className="w-8 h-8" src="/images/news-icon.png" alt="News Icon" /></Link></li>
                <li className="text-green-500"><Link to='/recyclecenters'><img className="w-8 h-8" src="/images/globe-icon.png" alt="Globe Icon" /></Link></li>
                <li className="text-yellow-500"><Link to='/wasteinfo'><img className="w-8 h-8" src="/images/bulb-icon.png" alt="Bulb Icon" /></Link></li>
                <li className="text-green-500"><Link to={`/profile/${customerId}`}><BsPersonCircle /></Link></li>
            </ul>
        </nav>
    )
}

export default Navbar;