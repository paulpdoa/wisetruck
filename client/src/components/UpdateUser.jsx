import axios from 'axios';
import { baseUrl } from '../baseUrl';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const UpdateUser = ({ closeApprove,userId,mssg }) => {

    const [isLoading,setIsLoading] = useState(false);
    const navigate = useNavigate();

    const approveUser = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const data = await axios.patch(`${baseUrl()}/admin/approveuser/${userId._id}`);
            setIsLoading(false);
            alert(data.data.mssg);
            navigate(data.data.redirect);
            closeApprove(false);
        } catch(err) {
            console.log(err) 
        }
    }

    return (
        <div className="h-screen w-full left-0 flex items-center justify-center bg-opacity-50 absolute top-0 bg-black">
            <div className="border border-gray-900 rounded-md flex items-center flex-col p-2 bg-white">
                { isLoading && <p className="text-green-500 font-semibold text-xl flex items-center gap-2"><AiOutlineLoading3Quarters className="animate-spin" />Please wait, approving this user</p> }
                
                { !isLoading &&
                <>
                    <p>{mssg}</p>
                    <div className="flex gap-2 items-center mt-3">
                        <button onClick={approveUser} className="bg-green-500 rounded-md text-gray-200 p-2">Yes</button>
                        <button onClick={() => closeApprove(false)} className="bg-red-500 rounded-md text-gray-200 p-2">No</button>
                    </div>
                </>
                }
            </div>
        </div>
    )
}

export default UpdateUser;