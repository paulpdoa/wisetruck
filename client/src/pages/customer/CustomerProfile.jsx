import { useParams,useNavigate,Link } from 'react-router-dom';
import { fetchApiHook } from '../../hooks/fetchApiHook';
import { baseUrl } from '../../baseUrl';
import { FiChevronRight } from 'react-icons/fi';

const CustomerProfile = () => {

    const { id } = useParams();
    const { records } = fetchApiHook(`${baseUrl()}/users/${id}`);

    const navigate = useNavigate();

    const logoutUser = async () => {
        navigate('/login');
        localStorage.removeItem('customerId');
        localStorage.removeItem('customer');
        localStorage.removeItem('token');
    }
    
    return (
        <div className="relative h-screen flex flex-col items-center justify-center">
            <div className="top-0 left-0 absolute w-full flex justify-center">
                <img className="w-full" src="/images/Rectangle_2.png" alt="background" />
                <img className="z-50 absolute p-2 w-24" src="/images/icon_person.png" alt="icon person" />
                <h1 className="absolute bottom-7 font-semibold text-sm">{records.firstName} {records.middleName} {records.lastName}</h1>
            </div>

            <div className="border w-11/12 border-gray-500 p-2">
                <div className="text-center">
                    <h2 className="font-semibold">Address</h2>
                    <p className="text-gray-400">{records.barangay} {records.municipality}, {records.province}</p>
                </div>

                <div className="text-center mt-4">
                    <h2 className="font-semibold">Email and Phone Number</h2>
                    <p>{records.email}</p>
                    <p>+63{records.phoneNumber?.slice(1)}</p>
                </div>  
            </div>

            <div className="m-2 w-11/12 mt-10">
                <Link to='/about'>
                    <div className="border border-gray-500 p-2 flex justify-between items-center">
                        <h2>About Us</h2>
                        <Link className="text-lg" to='/about'><FiChevronRight /></Link>
                    </div>
                </Link>
                <Link to='/support'>
                    <div className="border border-gray-500 p-2 flex justify-between items-center">
                        <h2>Help and Support</h2>
                        <Link className="text-lg" to='/support'><FiChevronRight /></Link>
                    </div>
                </Link>
                <Link to='/contact'>
                    <div className="border border-gray-500 p-2 flex justify-between items-center">
                        <h2>Contact Us</h2>
                        <Link className="text-lg" to='/contact'><FiChevronRight /></Link>
                    </div>
                </Link>
            </div>

            <button onClick={logoutUser} className="border border-gray-500 p-2 w-11/12 mt-20 font-semibold">Sign out</button>

        </div>
    )
}

export default CustomerProfile;