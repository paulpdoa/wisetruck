import axios from 'axios';
import { baseUrl } from '../baseUrl';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const RejectUser = ({ closeReject,userId,mssg }) => {

    const [isLoading,setIsLoading] = useState(false);
    const navigate = useNavigate();


    const rejectUser = async (e) => {
        e.preventDefault();

        try {
            const data = await axios.post(`${baseUrl()}/admin/rejectuser/`, { userId });
            console.log(data);
        } catch(err) {
            console.log(err) 
        }
    }

    return (
        <div className="h-screen w-full left-0 flex items-center justify-center bg-opacity-50 absolute top-0 bg-black">
            <div className="border border-gray-900 rounded-md flex items-center flex-col p-2 bg-white">
                { isLoading && <p className="text-green-500 text-sm flex items-center gap-2"><AiOutlineLoading3Quarters className="animate-spin" />Please wait, rejecting this user</p> }
                <p>{mssg}</p>
                <div className="flex gap-2 items-center">
                    <button onClick={rejectUser} className="bg-green-500 text-gray-200 p-2">Yes</button>
                    <button onClick={() => closeReject(false)} className="bg-red-500 text-gray-200 p-2">No</button>
                </div>
            </div>
        </div>
    )
}

export default RejectUser;