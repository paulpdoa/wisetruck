import { Link } from 'react-router-dom';

import { FcHome,FcNews } from 'react-icons/fc';
import { FaRecycle,FaLightbulb } from 'react-icons/fa';
import { BsPersonCircle } from 'react-icons/bs';

const Navbar = () => {
    return (
        <nav className="bottom-0 absolute left-0 w-full border-t-gray-900 border p-4 text-4xl">
            <ul className="flex justify-around items-center">
                <li><Link to='/customer'><FcHome /></Link></li>
                <li><Link to='/customer/news'><FcNews /></Link></li>
                <li className="text-green-500"><Link to='/customer/recyclecenters'><FaRecycle /></Link></li>
                <li className="text-yellow-500"><FaLightbulb /></li>
                <li className="text-green-500"><BsPersonCircle /></li>
            </ul>
        </nav>
    )
}

export default Navbar;