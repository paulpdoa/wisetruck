import { useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { baseUrl } from '../baseUrl';
import axios from 'axios';
import { fetchApiHook } from '../hooks/fetchApiHook';
import { IoEyeOutline,IoEyeOffOutline  } from "react-icons/io5";

const AdminChangePass = () => {

    const { id } = useParams();
    const { records } = fetchApiHook(`${baseUrl()}/admin/${id}`);

    const navigate = useNavigate();

    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');   

    const [isHiddenPass,setIsHiddenPass] = useState(true);
    const [isHiddenConfirmPass,setIsHiddenConfirmPass] = useState(true);


    const updatePassword = async (e) => {
        e.preventDefault();

        if(password.length >= 8) {
            if(password === confirmPassword) {
                try {
                    const data = await axios.patch(`${baseUrl()}/admin/update/password/${id}`,{password});
                    alert(data.data.mssg);
                    navigate(data.data.redirect);
                } catch(err) {
                    console.log(err);
                }
            } else {
                alert('Password does not match, please check password entered');
            }
        } else {
            alert('Password should be greater than or equal to 8 characters')
        }
    }

    return (
        <div className="mt-5 md:h-[31rem] h-[700px]">
            <div className="w-full flex items-center justify-center">
                <form onSubmit={updatePassword} className="w-1/2 flex flex-col gap-2">
                    <h1 className="text-center font-semibold">Change {records.firstName} {records.lastName} password</h1>

                    <div className="flex items-center p-2 border border-gray-300 bg-white">
                        <input required onChange={(e) => setPassword(e.target.value)} className="w-full h-full outline-none z-50" type={isHiddenPass ? "password" : "text"} placeholder="Password:" />
                        <p role="button" onClick={() => setIsHiddenPass(!isHiddenPass)}>{ !isHiddenPass ? <IoEyeOutline /> : <IoEyeOffOutline />}</p>
                    </div>
                    <div className="flex items-center p-2 border border-gray-300 bg-white">
                        <input required onChange={(e) => setConfirmPassword(e.target.value)} className="w-full h-full outline-none z-50" type={isHiddenConfirmPass ? "password" : "text"} placeholder="Confirm Password:" /> 
                        <p role="button" onClick={() => setIsHiddenConfirmPass(!isHiddenConfirmPass)}>{ !isHiddenConfirmPass ? <IoEyeOutline /> : <IoEyeOffOutline />}</p>
                    </div>

                    <div className="flex justify-center mt-2">
                    <button className="text-white bg-green-600 p-2 rounded-md">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default AdminChangePass;