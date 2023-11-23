import { useParams,useNavigate } from 'react-router-dom';
import { baseUrl } from '../baseUrl';
import { fetchApiHook } from '../hooks/fetchApiHook';
import { useState } from 'react';
import AdminUserUpdate from './AdminUserUpdate';

const ViewUserId = () => {

    const { id } = useParams();
    const { records: user } = fetchApiHook(`${baseUrl()}/users/${id}`);

    const navigate = useNavigate();
    
    const [isEditable,setIsEditable] = useState(false);
    const [showImage,setShowImage] = useState(false);

    

    return (
        <div className="p-10 w-full">
            <div className="h-full relative">
                <button className="font-semibold text-medium underline" onClick={() => navigate(-1)}>Go back</button>

                <div className="flex flex-col items-center justify-center">
                    <div className="border border-gray-900 rounded-md">
                        <a href={`${baseUrl()}/images/${user.validId}`} target='_blank'>
                            <img className="object-cover w-32 cursor-pointer" src={`${baseUrl()}/images/${user.validId}`} alt="Valid Id" />
                        </a>
                    </div>
                    <table className="w-full mt-5">
                        <tbody>
                            <tr>
                                <th>Name</th>
                                <th>Address</th>
                                <th>Email</th>
                                <th>Phone Number</th>
                                <th>Action</th>
                            </tr> 
                            <tr>
                                <td>{user.firstName} {user.middleName} {user.lastName}</td>
                                <td>{user.barangay} {user.municipality}, {user.province}</td>
                                <td>{user.email}</td>
                                <td>{user.phoneNumber}</td>
                                <td><button onClick={() => setIsEditable(!isEditable)} className={isEditable ? "text-red-500"  : "text-green-500" }>{ isEditable ? 'Close' : 'Edit' }</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>  

                {/* <div className="absolute w-full flex items-center justify-center left-0 top-0 h-full bg-black bg-opacity-70 p-2 rounded-md">
                    <img onClick={() => setShowImage(true)} className="object-cover w-32 cursor-pointer" src={`${baseUrl()}/images/${user.validId}`} alt="Valid Id" />
                </div> */}
            </div>

            { isEditable && <AdminUserUpdate user={user} /> }

        </div>
    )
}

export default ViewUserId;