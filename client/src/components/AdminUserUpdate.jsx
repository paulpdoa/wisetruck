import { useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../baseUrl';
import { useNavigate } from 'react-router-dom';

const AdminUserUpdate = ({ user }) => {

    const [firstName,setFirstName] = useState(user.firstName);
    const [middleName,setMiddleName] = useState(user.middleName);
    const [lastName,setLastName] = useState(user.lastName);
    const [barangay,setBarangay] = useState(user.barangay);
    const [municipality,setMunicipality] = useState(user.municipality);
    const [province,setProvince] = useState(user.province);
    const [phoneNumber,setPhoneNumber] = useState(user.phoneNumber);

    const navigate = useNavigate();

    const submitUserUpdate = async (e) => {
        e.preventDefault();

        try {
            const data = await axios.patch(`${baseUrl()}/admin/update/user/${user._id}`,{ firstName,middleName,lastName,barangay,municipality,province,phoneNumber });
            alert(data.data.mssg);
            navigate(data.data.redirect);
        } catch(err) {
            console.log(err);
        }

    }

    return (
        <div className="mt-10 flex flex-col w-full items-center justify-center">
            
            <form onSubmit={submitUserUpdate} className="bg-white border flex flex-col items-center p-3 border-gray-800 rounded-md w-full">
                <h1 className="font-semibold text-xl">Update User</h1>
                <div className="flex justify-around gap-2">
                    <div className="flex flex-col">
                        <label className="text-sm" htmlFor="first name">First Name:</label>
                        <input className="border border-gray-800 outline-none p-2 rounded-md" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}  />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm" htmlFor="first name">Middle Name:</label>
                        <input className="border border-gray-800 outline-none p-2 rounded-md" type="text" value={middleName} onChange={(e) => setMiddleName(e.target.value)}  />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm" htmlFor="first name">Last Name:</label>
                        <input className="border border-gray-800 outline-none p-2 rounded-md" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}  />
                    </div>
                </div>

                <div className="flex justify-around gap-2 mt-5">
                    <div className="flex flex-col">
                        <label className="text-sm" htmlFor="first name">Province:</label>
                        <input className="border border-gray-800 outline-none p-2 rounded-md" type="text" value={province} onChange={(e) => setProvince(e.target.value)}  />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm" htmlFor="first name">Barangay:</label>
                        <input className="border border-gray-800 outline-none p-2 rounded-md" type="text" value={barangay} onChange={(e) => setBarangay(e.target.value)}  />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm" htmlFor="first name">Municipality:</label>
                        <input className="border border-gray-800 outline-none p-2 rounded-md" type="text" value={municipality} onChange={(e) => setMunicipality(e.target.value)}  />
                    </div>
                </div>
                <div className="flex flex-col mt-5">
                    <label className="text-sm" htmlFor="first name">Phone Number:</label>
                    <input className="border border-gray-800 outline-none p-2 rounded-md" type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}  />
                </div>
                <button className="bg-green-700 text-white p-2 rounded-md mt-2">Submit</button>
            </form>
        </div>
    )
}

export default AdminUserUpdate;