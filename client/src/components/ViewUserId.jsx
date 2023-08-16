import { useParams,useNavigate } from 'react-router-dom';
import { baseUrl } from '../baseUrl';
import { fetchApiHook } from '../hooks/fetchApiHook';
import { useState } from 'react';

const ViewUserId = () => {

    const { id } = useParams();
    const { records: user } = fetchApiHook(`${baseUrl()}/users/${id}`);
    const navigate = useNavigate();

    return (
        <div className="p-10 w-full">
            <div className="h-full">
                <button className="font-semibold text-medium underline" onClick={() => navigate(-1)}>Go back</button>

                <div className="flex flex-col items-center justify-center">
                    <div className="border border-gray-900 rounded-md">
                        <img className="object-cover w-32" src={`${baseUrl()}/images/${user.validId}`} alt="Valid Id" />
                    </div>
                    <table className="w-full mt-5">
                        <tbody>
                            <tr>
                                <th>Name</th>
                                <th>Address</th>
                                <th>Email</th>
                                <th>Phone Number</th>
                            </tr> 
                            <tr>
                                <td>{user.firstName} {user.middleName} {user.lastName}</td>
                                <td>{user.barangay} {user.municipality}, {user.province}</td>
                                <td>{user.email}</td>
                                <td>{user.phoneNumber}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>  
            </div>
        </div>
    )
}

export default ViewUserId;