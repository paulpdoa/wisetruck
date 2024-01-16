import { useParams,useNavigate,Link } from 'react-router-dom';
import { fetchApiHook } from '../../hooks/fetchApiHook';
import { baseUrl } from '../../baseUrl';
import { FiChevronRight } from 'react-icons/fi';
import axios from 'axios';
import { useState } from 'react';

const CustomerProfile = () => {

    const { id } = useParams();
    const { records } = fetchApiHook(`${baseUrl()}/users/${id}`);

    const [feedback,setFeedback] = useState('');
    const [isRead,setIsRead] = useState(false); 

    const navigate = useNavigate();

    const logoutUser = async () => {
        navigate('/login');
        localStorage.removeItem('customerId');
        localStorage.removeItem('customer');
        localStorage.removeItem('token');
    }

    const addFeedback = async (e) => {
        e.preventDefault();

        try {   
            const data = await axios.post(`${baseUrl()}/feedbacks`,{ id,feedback,isRead });
            alert(data.data.mssg);
            navigate(data.data.redirect);
        } catch(err) {
            console.log(err);
        }
    }
    
    return (
        <div className="flex flex-col items-center justify-center bg-green-50 pb-36">
            <div className="w-full relative flex h-32 justify-center bg-green-700 rounded-b-full">
                {/* <img className="w-full absolute h-32 md:hidden block" src="/images/Rectangle_2.png" alt="background" /> */}
                <img className="z-50 absolute p-2 w-24" src="/images/icon_person.png" alt="icon person" />
                <h1 className="font-semibold text-sm z-50 absolute bottom-2 text-white">{records?.firstName} {records?.middleName} {records?.lastName}</h1>
            </div>

            <div className="border w-11/12 md:w-1/2 border-gray-500 bg-white p-2 md:mt-28 mt-9">
                <div className="text-center">
                    <h2 className="font-semibold">Address</h2>
                    <p className="text-gray-400">{records?.barangay} {records?.municipality}, {records?.province}</p>
                </div>

                <div className="text-center mt-4">
                    <h2 className="font-semibold">Email and Phone Number</h2>
                    <p>{records?.email}</p>
                    <p>+63{records?.phoneNumber?.slice(1)}</p>
                </div>  
            </div>

            <div className="m-2 w-11/12 md:w-1/2 mt-10">
                <Link to='/about'>
                    <div className="border border-gray-500 bg-white p-2 flex justify-between items-center">
                        <h2>About Us</h2>
                        <Link className="text-lg" to='/about'><FiChevronRight /></Link>
                    </div>
                </Link>
                <Link to='/support'>
                    <div className="border border-gray-500 bg-white p-2 flex justify-between items-center">
                        <h2>Help and Support</h2>
                        <Link className="text-lg" to='/support'><FiChevronRight /></Link>
                    </div>
                </Link>
                <Link to='/contact'>
                    <div className="border border-gray-500 bg-white p-2 flex justify-between items-center">
                        <h2>Contact Us</h2>
                        <Link className="text-lg" to='/contact'><FiChevronRight /></Link>
                    </div>
                </Link>

                <div className="mt-5">
                    <h2 className="font-medium text-gray-500">Add Feedback</h2>

                    <form onSubmit={addFeedback} className="flex flex-col mt-2">
                        <input onChange={(e) => setFeedback(e.target.value)} className="border border-gray-500 p-2 outline-none" type="text" placeholder="Comment feedback" />
                        <button className="items-end bg-green-700 w-1/3 border border-gray-900 mt-2 p-1 rounded-full font-medium text-white">Submit</button>
                    </form>
                </div>
            </div>

            <button onClick={logoutUser} className="border border-gray-500 p-2 w-11/12 md:w-1/2 mt-20 font-semibold bg-white">Sign out</button>

        </div>
    )
}

export default CustomerProfile;