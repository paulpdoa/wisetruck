import { Link } from 'react-router-dom';

import { FcHome,FcNews } from 'react-icons/fc';
import { FaRecycle,FaLightbulb } from 'react-icons/fa';
import { BsPersonCircle } from 'react-icons/bs';

const Navbar = () => {

    const customerId = localStorage.getItem('customerId');

    return (
        <nav className="fixed bottom-0 w-full border-t-gray-900 border p-4 text-4xl bg-white z-50">
            <ul className="flex justify-around items-center">
                <li><Link to='/'><FcHome /></Link></li>
                <li><Link to='/news'><FcNews /></Link></li>
                <li className="text-green-500"><Link to='/recyclecenters'><FaRecycle /></Link></li>
                <li className="text-yellow-500"><Link to='/wasteinfo'><FaLightbulb /></Link></li>
                <li className="text-green-500"><Link to={`/profile/${customerId}`}><BsPersonCircle /></Link></li>
            </ul>
        </nav>
    )
}

export default Navbar;