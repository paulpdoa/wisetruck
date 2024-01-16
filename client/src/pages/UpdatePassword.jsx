import { useState } from 'react';
import axios from 'axios'; 
import { baseUrl } from '../baseUrl';
import { useParams } from 'react-router-dom';
import SuccessMssg from '../components/SuccessMssg';
import { IoEyeOutline,IoEyeOffOutline  } from "react-icons/io5";

const UpdatePassword = () => {

    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');

    const [message,setMessage] = useState('');
    const [redirect,setRedirect] = useState('');
    const [isUpdated,setIsUpdated] = useState(false);

    const [isHiddenPass,setIsHiddenPass] = useState(true);
    const [isHiddenConfirmPass,setIsHiddenConfirmPass] = useState(true);

    const [passwordErr,setPasswordErr] = useState('');

    const { id } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = await axios.patch(`${baseUrl()}/user/update/password`,{ id,password,confirmPassword });
            setIsUpdated(true);
            setMessage(data.data.mssg);
            setRedirect(data.data.redirect);
        } catch(err) {
            setPasswordErr(err.response.data.mssg);
            setTimeout(() => {
                setPasswordErr('');
            })
            alert(err.response.data.mssg);
        }
    }

    return (
        <div className="relative h-screen flex items-center justify-center bg-green-50 overflow-hidden pb-36">
            <form className="md:w-1/2 relative overflow-hidden w-full p-14 md:bg-white md:border md:border-gray-800 md:shadow-lg md:rounded-lg" onSubmit={handleSubmit}>
                <h1 className="font-bold text-green-700 text-2xl">Create new password</h1>

                <div className="relative flex flex-col gap-2 mt-5 z-50">
                    <span className="text-xs text-right text-gray-500">Minimum of 8 characters</span>
                    <div className="flex items-center p-2 border border-gray-300 bg-white">
                        <input className="w-full h-full outline-none z-50" type={isHiddenPass ? "password" : "text"} onChange={(e) => setPassword(e.target.value)} placeholder="New Password" />
                        <p role="button" onClick={() => setIsHiddenPass(!isHiddenPass)}>{ !isHiddenPass ? <IoEyeOutline /> : <IoEyeOffOutline />}</p>
                    </div>
                    <span className="text-red-500 text-xs">{passwordErr}</span>

                    <div className="flex items-center p-2 border border-gray-300 bg-white">
                        <input className="w-full h-full outline-none z-50" type={isHiddenConfirmPass ? "password" : "text"} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" />
                        <p role="button" onClick={() => setIsHiddenConfirmPass(!isHiddenConfirmPass)}>{ !isHiddenConfirmPass ? <IoEyeOutline /> : <IoEyeOffOutline />}</p>
                    </div>

                    
                    <button className="bg-green-700 text-white text-lg font-normal border mt-3 border-gray-800 w-1/2 self-center p-2 rounded-full">Submit</button>
                </div>
            </form>
            <img className="absolute bottom-0 -right-12" src="/images/WiseTruck_Logo.png" alt="Logo" />
            { isUpdated && <SuccessMssg message={message} redirect={redirect} closeMessage={setIsUpdated} /> }
        </div>
    )
}

export default UpdatePassword;